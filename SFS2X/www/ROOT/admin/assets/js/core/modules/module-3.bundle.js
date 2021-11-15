/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-3"],{

/***/ "./src/modules/blue-box-monitor.js":
/*!*****************************************!*\
  !*** ./src/modules/blue-box-monitor.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlueBoxMonitor; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");


class BlueBoxMonitor extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('bBoxMonitor');

		// Outgoing requests
		this.REQ_GET_DATA = 'getData';

		// Incoming responses
		this.RESP_DATA = 'data';
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

		// Initialize refresh button
		$('#bbm-refreshBt').on('click', $.proxy(this._onUpdateIntervalChange, this));

		// Initialize zone filter dropdown
		this._zonesFilterDD = $('#bbm-zonesDD').kendoDropDownList({
			change: $.proxy(this._onFilterChange, this)
		}).data('kendoDropDownList');

		// Initialize username filter input
		$('#bbm-usernameIn').on('input', $.proxy(this._onFilterChange, this));

		// Initialize clear button
		$('#bbm-clearBt').on('click', $.proxy(this._onClearFilterClick, this));

		// Initialize interval dropdown
		this._intervalDropDown = $('#bbm-intervalDD').kendoDropDownList({
			valueTemplate: '<span class="text-muted pr-1">Interval:</span><span>#:data.text#</span>',
			change: $.proxy(this._onUpdateIntervalChange, this)
		}).data('kendoDropDownList');

		// Initialize grid
		this._grid = $('#bbm-grid').kendoGrid({
			scrollable: true,
            sortable: true,
			//resizable: true,
			selectable: false,
            columns:
            [
				{
	                field: 'zone',
	                width: 150,
					title: 'Zone',
	            },
	            {
	                field: 'userId',
	                width: 100,
	                title: 'User ID',
	            },
	            {
	                field: 'userName',
	                width: 250,
	                title: 'Username',
	            },
	            {
	                field: 'sessionId',
	                width: 150,
	                title: 'BlueBox Session Id',
	            },
				{
	                field: 'lastReq',
	                width: 100,
					title: 'Last Request',
	            },
				{
	                field: 'lastPoll',
	                width: 100,
					title: 'Last Polling',
	            },
				{
	                field: 'queueSize',
	                width: 100,
					title: 'Queued Messages',
	            },
			],
			noRecords: {
				template: 'No BlueBox sessions.'
			},
			dataSource: []
        }).data('kendoGrid');

		// Request data to server
		this._requestData();
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#bbm-refreshBt').off('click');
		$('#bbm-usernameIn').off('input');
		$('#bbm-clearBt').off('click');

		// Clear request scheduling
		clearTimeout(this._requestTimer);
	}

	onExtensionCommand(command, data)
	{
		// BlueBox-ed connections data received
		if (command == this.RESP_DATA)
		{
			let clients = data.getSFSArray('clients');
			let clientsArr = [];

			let zones = [];

			for (let i = 0; i < clients.size(); i++)
			{
				let clientIn = clients.getSFSArray(i);

				let client = {
					zone: clientIn.getUtfString(0),
					userId: clientIn.getInt(1),
					userName: clientIn.getUtfString(2),
					sessionId: clientIn.getUtfString(3),
					lastReq: clientIn.getLong(4) + 's ago',
					lastPoll: clientIn.getLong(5) + 's ago',
					queueSize: clientIn.getInt(6)
				}

				clientsArr.push(client);

				if (zones.indexOf(client.zone) < 0)
					zones.push(client.zone);
			}

			// Sort zones list
			zones.sort(function (a, b) {
				return a.localeCompare(b);
			});

			// Add "any" zone
			zones.unshift('[any]');

			// Set selected zone
			let selectedZone = this._zonesFilterDD.value();
			let selectedIndex = zones.indexOf(selectedZone);
			if (selectedIndex < 0)
				selectedIndex = 0;

			this._zonesFilterDD.setDataSource(zones);
			this._zonesFilterDD.select(selectedIndex);

			// Read current horizontal scroll value
			const scrollLeft = $('.k-grid-content', this._grid.wrapper).scrollLeft();

			// Substitute grid's data source, retaining current sorting
			let currSort = this._grid.dataSource.sort();

			let ds = new kendo.data.DataSource({
				sort: currSort,
				data: clientsArr
			});

			// Set filters
			this._setFilters(ds);

			// Assign data source to grid
			this._grid.setDataSource(ds);

			// Set horizontal scroll
			$('.k-grid-content', this._grid.wrapper).scrollLeft(scrollLeft);

			// Update counter
			$('#bbm-totalSessions').text(clientsArr.length);
		}
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onUpdateIntervalChange()
	{
		// Request data to server
		this._requestData();
	}

	_onFilterChange()
	{
		// Set filters
		this._setFilters(this._grid.dataSource);
	}

	_onClearFilterClick()
	{
		this._zonesFilterDD.select(0);
		$('#bbm-usernameIn').val('');
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	/**
	 * Build the polling request to be sent to the server.
	 */
	_requestData()
	{
		// Clear previous request scheduling
		clearTimeout(this._requestTimer);

		// Check if connection is still available
		if (this.smartFox.isConnected)
		{
			// Send request to extension
			this.sendExtensionRequest(this.REQ_GET_DATA);

			// Schedule next request
			this._requestTimer = setTimeout($.proxy(this._requestData, this), Number(this._intervalDropDown.value()) * 1000);
		}
	}

	_setFilters(dataStore)
	{
		let filters = [];

		// Zone filtering
		if (this._zonesFilterDD.select() > 0)
			filters.push({
				field: 'zone', operator: 'eq', value: this._zonesFilterDD.value()
			});

		// Username filtering
		if ($('#bbm-usernameIn').val() != '')
			filters.push({
				field: 'userName', operator: 'contains', value: $('#bbm-usernameIn').val()
			});

		// Set filters
		dataStore.filter(filters);

		// Update counter
		$('#bbm-displayedSessions').text(dataStore.total());
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMy5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL2JsdWUtYm94LW1vbml0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmx1ZUJveE1vbml0b3IgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ2JCb3hNb25pdG9yJyk7XG5cblx0XHQvLyBPdXRnb2luZyByZXF1ZXN0c1xuXHRcdHRoaXMuUkVRX0dFVF9EQVRBID0gJ2dldERhdGEnO1xuXG5cdFx0Ly8gSW5jb21pbmcgcmVzcG9uc2VzXG5cdFx0dGhpcy5SRVNQX0RBVEEgPSAnZGF0YSc7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDT01NT04gTU9EVUxFIElOVEVSRkFDRSBNRVRIT0RTXG5cdC8vIFRoaXMgbWVtYmVycyBhcmUgdXNlZCBieSB0aGUgbWFpbiBjb250cm9sbGVyXG5cdC8vIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIG1vZHVsZSdzIGNvbnRyb2xsZXIuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0aW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcilcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcik7XG5cblx0XHQvLyBJbml0aWFsaXplIHJlZnJlc2ggYnV0dG9uXG5cdFx0JCgnI2JibS1yZWZyZXNoQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uVXBkYXRlSW50ZXJ2YWxDaGFuZ2UsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgem9uZSBmaWx0ZXIgZHJvcGRvd25cblx0XHR0aGlzLl96b25lc0ZpbHRlckREID0gJCgnI2JibS16b25lc0REJykua2VuZG9Ecm9wRG93bkxpc3Qoe1xuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uRmlsdGVyQ2hhbmdlLCB0aGlzKVxuXHRcdH0pLmRhdGEoJ2tlbmRvRHJvcERvd25MaXN0Jyk7XG5cblx0XHQvLyBJbml0aWFsaXplIHVzZXJuYW1lIGZpbHRlciBpbnB1dFxuXHRcdCQoJyNiYm0tdXNlcm5hbWVJbicpLm9uKCdpbnB1dCcsICQucHJveHkodGhpcy5fb25GaWx0ZXJDaGFuZ2UsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgY2xlYXIgYnV0dG9uXG5cdFx0JCgnI2JibS1jbGVhckJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNsZWFyRmlsdGVyQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgaW50ZXJ2YWwgZHJvcGRvd25cblx0XHR0aGlzLl9pbnRlcnZhbERyb3BEb3duID0gJCgnI2JibS1pbnRlcnZhbEREJykua2VuZG9Ecm9wRG93bkxpc3Qoe1xuXHRcdFx0dmFsdWVUZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwidGV4dC1tdXRlZCBwci0xXCI+SW50ZXJ2YWw6PC9zcGFuPjxzcGFuPiM6ZGF0YS50ZXh0Izwvc3Bhbj4nLFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uVXBkYXRlSW50ZXJ2YWxDaGFuZ2UsIHRoaXMpXG5cdFx0fSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZ3JpZFxuXHRcdHRoaXMuX2dyaWQgPSAkKCcjYmJtLWdyaWQnKS5rZW5kb0dyaWQoe1xuXHRcdFx0c2Nyb2xsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxuXHRcdFx0Ly9yZXNpemFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbHVtbnM6XG4gICAgICAgICAgICBbXG5cdFx0XHRcdHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnem9uZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxuXHRcdFx0XHRcdHRpdGxlOiAnWm9uZScsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAndXNlcklkJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ1VzZXIgSUQnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3VzZXJOYW1lJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAyNTAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ1VzZXJuYW1lJyxcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdzZXNzaW9uSWQnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcblx0ICAgICAgICAgICAgICAgIHRpdGxlOiAnQmx1ZUJveCBTZXNzaW9uIElkJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdFx0e1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdsYXN0UmVxJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdFx0XHRcdFx0dGl0bGU6ICdMYXN0IFJlcXVlc3QnLFxuXHQgICAgICAgICAgICB9LFxuXHRcdFx0XHR7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ2xhc3RQb2xsJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdFx0XHRcdFx0dGl0bGU6ICdMYXN0IFBvbGxpbmcnLFxuXHQgICAgICAgICAgICB9LFxuXHRcdFx0XHR7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3F1ZXVlU2l6ZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuXHRcdFx0XHRcdHRpdGxlOiAnUXVldWVkIE1lc3NhZ2VzJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdF0sXG5cdFx0XHRub1JlY29yZHM6IHtcblx0XHRcdFx0dGVtcGxhdGU6ICdObyBCbHVlQm94IHNlc3Npb25zLidcblx0XHRcdH0sXG5cdFx0XHRkYXRhU291cmNlOiBbXVxuICAgICAgICB9KS5kYXRhKCdrZW5kb0dyaWQnKTtcblxuXHRcdC8vIFJlcXVlc3QgZGF0YSB0byBzZXJ2ZXJcblx0XHR0aGlzLl9yZXF1ZXN0RGF0YSgpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdCQoJyNiYm0tcmVmcmVzaEJ0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNiYm0tdXNlcm5hbWVJbicpLm9mZignaW5wdXQnKTtcblx0XHQkKCcjYmJtLWNsZWFyQnQnKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHQvLyBDbGVhciByZXF1ZXN0IHNjaGVkdWxpbmdcblx0XHRjbGVhclRpbWVvdXQodGhpcy5fcmVxdWVzdFRpbWVyKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cdFx0Ly8gQmx1ZUJveC1lZCBjb25uZWN0aW9ucyBkYXRhIHJlY2VpdmVkXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0RBVEEpXG5cdFx0e1xuXHRcdFx0bGV0IGNsaWVudHMgPSBkYXRhLmdldFNGU0FycmF5KCdjbGllbnRzJyk7XG5cdFx0XHRsZXQgY2xpZW50c0FyciA9IFtdO1xuXG5cdFx0XHRsZXQgem9uZXMgPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnRzLnNpemUoKTsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgY2xpZW50SW4gPSBjbGllbnRzLmdldFNGU0FycmF5KGkpO1xuXG5cdFx0XHRcdGxldCBjbGllbnQgPSB7XG5cdFx0XHRcdFx0em9uZTogY2xpZW50SW4uZ2V0VXRmU3RyaW5nKDApLFxuXHRcdFx0XHRcdHVzZXJJZDogY2xpZW50SW4uZ2V0SW50KDEpLFxuXHRcdFx0XHRcdHVzZXJOYW1lOiBjbGllbnRJbi5nZXRVdGZTdHJpbmcoMiksXG5cdFx0XHRcdFx0c2Vzc2lvbklkOiBjbGllbnRJbi5nZXRVdGZTdHJpbmcoMyksXG5cdFx0XHRcdFx0bGFzdFJlcTogY2xpZW50SW4uZ2V0TG9uZyg0KSArICdzIGFnbycsXG5cdFx0XHRcdFx0bGFzdFBvbGw6IGNsaWVudEluLmdldExvbmcoNSkgKyAncyBhZ28nLFxuXHRcdFx0XHRcdHF1ZXVlU2l6ZTogY2xpZW50SW4uZ2V0SW50KDYpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjbGllbnRzQXJyLnB1c2goY2xpZW50KTtcblxuXHRcdFx0XHRpZiAoem9uZXMuaW5kZXhPZihjbGllbnQuem9uZSkgPCAwKVxuXHRcdFx0XHRcdHpvbmVzLnB1c2goY2xpZW50LnpvbmUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTb3J0IHpvbmVzIGxpc3Rcblx0XHRcdHpvbmVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdFx0cmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBZGQgXCJhbnlcIiB6b25lXG5cdFx0XHR6b25lcy51bnNoaWZ0KCdbYW55XScpO1xuXG5cdFx0XHQvLyBTZXQgc2VsZWN0ZWQgem9uZVxuXHRcdFx0bGV0IHNlbGVjdGVkWm9uZSA9IHRoaXMuX3pvbmVzRmlsdGVyREQudmFsdWUoKTtcblx0XHRcdGxldCBzZWxlY3RlZEluZGV4ID0gem9uZXMuaW5kZXhPZihzZWxlY3RlZFpvbmUpO1xuXHRcdFx0aWYgKHNlbGVjdGVkSW5kZXggPCAwKVxuXHRcdFx0XHRzZWxlY3RlZEluZGV4ID0gMDtcblxuXHRcdFx0dGhpcy5fem9uZXNGaWx0ZXJERC5zZXREYXRhU291cmNlKHpvbmVzKTtcblx0XHRcdHRoaXMuX3pvbmVzRmlsdGVyREQuc2VsZWN0KHNlbGVjdGVkSW5kZXgpO1xuXG5cdFx0XHQvLyBSZWFkIGN1cnJlbnQgaG9yaXpvbnRhbCBzY3JvbGwgdmFsdWVcblx0XHRcdGNvbnN0IHNjcm9sbExlZnQgPSAkKCcuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl9ncmlkLndyYXBwZXIpLnNjcm9sbExlZnQoKTtcblxuXHRcdFx0Ly8gU3Vic3RpdHV0ZSBncmlkJ3MgZGF0YSBzb3VyY2UsIHJldGFpbmluZyBjdXJyZW50IHNvcnRpbmdcblx0XHRcdGxldCBjdXJyU29ydCA9IHRoaXMuX2dyaWQuZGF0YVNvdXJjZS5zb3J0KCk7XG5cblx0XHRcdGxldCBkcyA9IG5ldyBrZW5kby5kYXRhLkRhdGFTb3VyY2Uoe1xuXHRcdFx0XHRzb3J0OiBjdXJyU29ydCxcblx0XHRcdFx0ZGF0YTogY2xpZW50c0FyclxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFNldCBmaWx0ZXJzXG5cdFx0XHR0aGlzLl9zZXRGaWx0ZXJzKGRzKTtcblxuXHRcdFx0Ly8gQXNzaWduIGRhdGEgc291cmNlIHRvIGdyaWRcblx0XHRcdHRoaXMuX2dyaWQuc2V0RGF0YVNvdXJjZShkcyk7XG5cblx0XHRcdC8vIFNldCBob3Jpem9udGFsIHNjcm9sbFxuXHRcdFx0JCgnLmstZ3JpZC1jb250ZW50JywgdGhpcy5fZ3JpZC53cmFwcGVyKS5zY3JvbGxMZWZ0KHNjcm9sbExlZnQpO1xuXG5cdFx0XHQvLyBVcGRhdGUgY291bnRlclxuXHRcdFx0JCgnI2JibS10b3RhbFNlc3Npb25zJykudGV4dChjbGllbnRzQXJyLmxlbmd0aCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVUkgRVZFTlQgTElTVEVORVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uVXBkYXRlSW50ZXJ2YWxDaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gUmVxdWVzdCBkYXRhIHRvIHNlcnZlclxuXHRcdHRoaXMuX3JlcXVlc3REYXRhKCk7XG5cdH1cblxuXHRfb25GaWx0ZXJDaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gU2V0IGZpbHRlcnNcblx0XHR0aGlzLl9zZXRGaWx0ZXJzKHRoaXMuX2dyaWQuZGF0YVNvdXJjZSk7XG5cdH1cblxuXHRfb25DbGVhckZpbHRlckNsaWNrKClcblx0e1xuXHRcdHRoaXMuX3pvbmVzRmlsdGVyREQuc2VsZWN0KDApO1xuXHRcdCQoJyNiYm0tdXNlcm5hbWVJbicpLnZhbCgnJyk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvKipcblx0ICogQnVpbGQgdGhlIHBvbGxpbmcgcmVxdWVzdCB0byBiZSBzZW50IHRvIHRoZSBzZXJ2ZXIuXG5cdCAqL1xuXHRfcmVxdWVzdERhdGEoKVxuXHR7XG5cdFx0Ly8gQ2xlYXIgcHJldmlvdXMgcmVxdWVzdCBzY2hlZHVsaW5nXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3JlcXVlc3RUaW1lcik7XG5cblx0XHQvLyBDaGVjayBpZiBjb25uZWN0aW9uIGlzIHN0aWxsIGF2YWlsYWJsZVxuXHRcdGlmICh0aGlzLnNtYXJ0Rm94LmlzQ29ubmVjdGVkKVxuXHRcdHtcblx0XHRcdC8vIFNlbmQgcmVxdWVzdCB0byBleHRlbnNpb25cblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX0RBVEEpO1xuXG5cdFx0XHQvLyBTY2hlZHVsZSBuZXh0IHJlcXVlc3Rcblx0XHRcdHRoaXMuX3JlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLl9yZXF1ZXN0RGF0YSwgdGhpcyksIE51bWJlcih0aGlzLl9pbnRlcnZhbERyb3BEb3duLnZhbHVlKCkpICogMTAwMCk7XG5cdFx0fVxuXHR9XG5cblx0X3NldEZpbHRlcnMoZGF0YVN0b3JlKVxuXHR7XG5cdFx0bGV0IGZpbHRlcnMgPSBbXTtcblxuXHRcdC8vIFpvbmUgZmlsdGVyaW5nXG5cdFx0aWYgKHRoaXMuX3pvbmVzRmlsdGVyREQuc2VsZWN0KCkgPiAwKVxuXHRcdFx0ZmlsdGVycy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6ICd6b25lJywgb3BlcmF0b3I6ICdlcScsIHZhbHVlOiB0aGlzLl96b25lc0ZpbHRlckRELnZhbHVlKClcblx0XHRcdH0pO1xuXG5cdFx0Ly8gVXNlcm5hbWUgZmlsdGVyaW5nXG5cdFx0aWYgKCQoJyNiYm0tdXNlcm5hbWVJbicpLnZhbCgpICE9ICcnKVxuXHRcdFx0ZmlsdGVycy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6ICd1c2VyTmFtZScsIG9wZXJhdG9yOiAnY29udGFpbnMnLCB2YWx1ZTogJCgnI2JibS11c2VybmFtZUluJykudmFsKClcblx0XHRcdH0pO1xuXG5cdFx0Ly8gU2V0IGZpbHRlcnNcblx0XHRkYXRhU3RvcmUuZmlsdGVyKGZpbHRlcnMpO1xuXG5cdFx0Ly8gVXBkYXRlIGNvdW50ZXJcblx0XHQkKCcjYmJtLWRpc3BsYXllZFNlc3Npb25zJykudGV4dChkYXRhU3RvcmUudG90YWwoKSk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9