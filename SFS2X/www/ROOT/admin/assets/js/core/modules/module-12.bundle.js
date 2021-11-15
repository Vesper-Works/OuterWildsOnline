/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-12"],{

/***/ "./src/components/module-specific/words-files-manager.js":
/*!***************************************************************!*\
  !*** ./src/components/module-specific/words-files-manager.js ***!
  \***************************************************************/
/*! exports provided: WordsFilesManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WordsFilesManager", function() { return WordsFilesManager; });
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utilities */ "./src/utils/utilities.js");


class WordsFilesManager extends HTMLElement
{
	constructor()
	{
	    super();

		this.REFRESH_WORDS_FILES_CLICK_EVENT = 'refreshWordsFilesClick';
		this.EDIT_WORDS_FILE_CLICK_EVENT = 'editWordsFileClick';
		this.SAVE_WORDS_FILE_CLICK_EVENT = 'saveWordsFileClick';
		this.REMOVE_WORDS_FILE_CLICK_EVENT = 'removeWordsFileClick';
		this.ASSIGN_WORDS_FILE_CLICK_EVENT = 'assingWordsFileClick';

		this.CONFIG_FOLDER = 'config/';
		this.WORDS_FILE_EXT = '.words.txt';

		this._modalHtml = `
			<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-primary" id="editModalTitle">Word File Editor</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body in-flow-invalid-msg">
							<fieldset id="editFieldset">
								<div class="form-group">
									<div class="col-form-label form-label-container">
										<label for="filename" class="form-label">Filename <i class="fas fa-question-circle text-muted help" title="Name of the words file. The file will be saved in server's <em>config</em> folder."></i></label>
									</div>
									<div class="inner-widget">
										<div class="input-group">
										<input type="text" id="filename" name="filename" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" aria-describedby="extension" />
											<div class="input-group-append">
												<span class="input-group-text" id="extension">.words.txt</span>
											</div>
										</div>
										<span class="k-invalid-msg position-static" data-for="filename"></span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-form-label form-label-container">
										<label for="content" class="form-label">Content <i class="fas fa-question-circle text-muted help" title="Enter a word or a valid regular expression per line. See configuration's <em>Words file</em> field description for additional information."></i></label>
									</div>
									<div class="inner-widget">
										<textarea id="content" name="content" class="form-control k-textarea w-100" rows="10"></textarea>
										<span class="k-invalid-msg position-static" data-for="content"></span>
									</div>
								</div>
							</fieldset>
						</div>
						<div class="modal-footer flex-column">
							<div class="d-flex w-100">
								<div class="flex-grow-1 text-left">
									<button id="saveWordFileButton" type="button" class="k-button k-primary"><i class="fas fa-save mr-1"></i>Save word file</button>
									<i id="saveSpinner" class="fas fa-circle-notch fa-spin text-primary align-middle ml-1"></i>
								</div>
								<div class="flex-grow-1 text-right">
									<button type="button" class="k-button k-secondary" data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		//-------------------------------------------

		$(this).append(`
			<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
				<label class="form-label">Available words files <i class="fas fa-question-circle text-muted help" title="The list of words files found in server's <em>config</em> folder. Click on the Assign button to set the <strong>Words file</strong> field to the selected file. Configuration submission is then required to save the new value."></i></label>
			</div>
			<div class="inner-widget align-self-center col-sm">
				<div>
					<div id="wordsFiles" class="limited-height"></div>
					<div id="actionButtons" class="mt-2 text-right" disabled>
						<i id="actionSpinner" class="fas fa-circle-notch fa-spin text-primary align-middle"></i>
						<button id="refreshButton" type="button" class="k-button k-secondary ml-2" title="Refresh"><i class="fas fa-redo-alt"></i></button>
						<button id="addButton" type="button" class="k-button k-secondary ml-2" title="Add"><i class="fas fa-plus"></i></button>
						<button id="editButton" type="button" class="k-button k-secondary ml-2" title="Edit" disabled><i class="fas fa-pen"></i></button>
						<button id="removeButton" type="button" class="k-button k-secondary ml-2" title="Remove" disabled><i class="fas fa-times"></i></button>
						<button id="assignButton" type="button" class="k-button k-secondary ml-2" title="Assign" disabled><i class="fas fa-compress-arrows-alt"></i></button>
					</div>
				</div>
			</div>
		`);

		//-------------------------------------------

		// Initialize grid
		this._wordsFilesGrid = $('#wordsFiles', $(this)).kendoGrid({
			resizable: true,
			selectable: 'row',
			change: $.proxy(this._onWordsFilesGridSelectionChange, this),
			columns: [
				{
					field: 'name',
					title: 'Filename',
					width: 120
				},
				{
					field: 'date',
					title: 'Date',
					width: 80
				},
				{
					field: 'size',
					title: 'Size',
					width: 80
				}
			],
			noRecords: {
				template: 'No files.'
			}
		}).data('kendoGrid');

		// Add listeners to button clicks
		$('#refreshButton', $(this)).on('click', $.proxy(this._onReloadClick, this));
		$('#addButton', $(this)).on('click', $.proxy(this._onAddClick, this));
		$('#editButton', $(this)).on('click', $.proxy(this._onEditClick, this));
		$('#removeButton', $(this)).on('click', $.proxy(this._onRemoveClick, this));
		$('#assignButton', $(this)).on('click', $.proxy(this._onAssignClick, this));
	}

	destroy()
	{
		// Destroy grid
		this._wordsFilesGrid.destroy();

		// Remove event listeners
		$('#refreshButton', $(this)).off('click');
		$('#addButton', $(this)).off('click');
		$('#editButton', $(this)).off('click');
		$('#removeButton', $(this)).off('click');
		$('#assignButton', $(this)).off('click');

		// Hide modal (which in turn destroys it)
		let modalElement = $('#editModal', $(this));

		if (modalElement)
			modalElement.modal('hide');
	}

	get enabled()
	{
		return this._isEnabled;
	}

	set enabled(value)
	{
		this._isEnabled = value;

		// Enable/disable buttons
		$('#actionButtons', this).attr('disabled', !value);

		// Hide spinner
		if (value)
			this.actionSpinnerVisible = false;

		// Enable/disable modal
		let modalElement = $('#editModal', $(this));

		if (modalElement)
		{
			// Disable modal close buttons
			$('button[data-dismiss="modal"]', modalElement).attr('disabled', !value);

			// Disable save button
			$('#saveWordFileButton', modalElement).attr('disabled', !value);

			// Disable fieldset
			$('#editFieldset', modalElement).attr('disabled', !value);

			// Hide spinner
			if (value)
				this.saveSpinnerVisible = false;
		}
	}

	set actionSpinnerVisible(value)
	{
		if (value)
			$('#actionSpinner', $(this)).show();
		else
			$('#actionSpinner', $(this)).hide();
	}

	set saveSpinnerVisible(value)
	{
		let modalElement = $('#editModal', $(this));

		if (modalElement)
		{
			if (value)
				$('#saveSpinner', modalElement).show();
			else
				$('#saveSpinner', modalElement).hide();
		}
	}

	refreshWordsFilesList(wordsFilesList, hideEditModal)
	{
		if (hideEditModal)
		{
			let modalElement = $('#editModal', $(this));

			if (modalElement)
				modalElement.modal('hide');
		}

		let files = [];
		this._existingFilenames = [];

		for (let f = 0; f < wordsFilesList.size(); f++)
		{
			const file = wordsFilesList.getSFSObject(f);

			const fileObj = {};
			fileObj.name = file.getUtfString('name');
			fileObj.date = file.getUtfString('date') + ' ' + file.getUtfString('time');
			fileObj.size = Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_0__["bytesToSize"])(file.getLong('size'), 2);

			// Populate files list
			files.push(fileObj);

			// Save ref to existing filenames, to check them when a new file is created
			this._existingFilenames.push(fileObj.name);
		}

		// Assign data source to grid
		this._setWordsFilesGridDataSource(files);
		this._onWordsFilesGridSelectionChange();

		// Enable
		this.enabled = true;
	}

	getSelectedWordsFileName()
	{
		if (this._wordsFilesGrid.select() != null)
		{
			let selectedIndex = this._wordsFilesGrid.select().index();
			return this._wordsFilesGrid.dataSource.at(selectedIndex).name;
		}
		else
			return null;
	}

	editWordsFile(filename, content)
	{
		this._isNewFile = false;

		this.enabled = true;

		// Show modal
		this._showModal();

		// Remove default extension from filename
		filename = filename.substring(0, filename.lastIndexOf(this.WORDS_FILE_EXT));

		// Enter content filename and content in modal form
		$('#editModal #filename', $(this)).val(filename);
		$('#editModal #content', $(this)).val(content);

		// Set filename field as not editable and hide note
		$('#editModal #filename', $(this)).attr('disabled', true);
		$('#editModal #filenameNote', $(this)).hide();
	}

	getExistingFilenames()
	{
		return this._existingFilenames;
	}

	_setWordsFilesGridDataSource(ds)
	{
		// Read current horizontal scroll value
	   const scrollLeft = $('#wordsFiles .k-grid-content', this._wordsFilesGrid.wrapper).scrollLeft();

	   // Assign data source to grid
	   this._wordsFilesGrid.setDataSource(ds);

	   // Set horizontal scroll
	   $('#wordsFiles .k-grid-content', this._wordsFilesGrid.wrapper).scrollLeft(scrollLeft);
	}

	_onWordsFilesGridSelectionChange()
	{
		// Enable/disable buttons
		const selectedRows = this._wordsFilesGrid.select();
		$('#editButton').attr('disabled', selectedRows.length == 0);
		$('#removeButton').attr('disabled', selectedRows.length == 0);
		$('#assignButton').attr('disabled', selectedRows.length == 0);
	}

	_onReloadClick()
	{
		// Fire event to request file content to server
		let evt = new CustomEvent(this.REFRESH_WORDS_FILES_CLICK_EVENT, {
	    	detail: null,
			bubbles: false,
			cancelable: false
		});

		this.dispatchEvent(evt);
	}

	_onAddClick()
	{
		this._isNewFile = true;

		// Show modal
		this._showModal();
	}

	_onEditClick()
	{
		// Disable buttons
		this.enabled = false;
		this.actionSpinnerVisible = true;

		// Fire event to request file content to server
		let evt = new CustomEvent(this.EDIT_WORDS_FILE_CLICK_EVENT, {
	    	detail: this.getSelectedWordsFileName(),
			bubbles: false,
			cancelable: false
		});

		this.dispatchEvent(evt);
	}

	_onRemoveClick()
	{
		// Fire event to request file removal to server
		let evt = new CustomEvent(this.REMOVE_WORDS_FILE_CLICK_EVENT, {
	    	detail: this.getSelectedWordsFileName(),
			bubbles: false,
			cancelable: false
		});

		this.dispatchEvent(evt);
	}

	_onAssignClick()
	{
		// Fire event to substitute path in configuration
		let evt = new CustomEvent(this.ASSIGN_WORDS_FILE_CLICK_EVENT, {
	    	detail: this.CONFIG_FOLDER + this.getSelectedWordsFileName(),
			bubbles: false,
			cancelable: false
		});

		this.dispatchEvent(evt);
	}

	_onSaveWordFileClick()
	{
		if (this._validator.validate())
		{
			// Show spinner
			$('#editModal #saveSpinner', $(this)).show();

			// Fire event to request file to be saved by server
			let evt = new CustomEvent(this.SAVE_WORDS_FILE_CLICK_EVENT, {
		    	detail: {
					filename: $('#editModal #filename', $(this)).val() + this.WORDS_FILE_EXT,
					isNew: this._isNewFile,
					content: $('#editModal #content', $(this)).val()
				},
				bubbles: false,
				cancelable: false
			});

			this.dispatchEvent(evt);
		}
	}

	_showModal()
	{
		// Append modal html
		$(this).append(this._modalHtml);

		let modalElement = $('#editModal', $(this));

		// Initialize kendo validation
		this._validator = modalElement.find('#editFieldset').kendoValidator({
			validateOnBlur: true,
			rules: {
				requiredFilename: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=filename]'))
						valid = input.val() !== '';
					return valid;
				}, this),
				validFilename: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=filename]'))
						valid = (!input.val().includes('\\') && !input.val().includes('/'));
					return valid;
				}, this)
			},
			messages: {
				requiredFilename: 'Required',
				validFilename: 'Contains invalid characters (slash, backslash)'
			}
		}).data('kendoValidator');

		// Hide save spinner
		$('#saveSpinner', modalElement).hide();

		// Add listener to Save button click
		$('#saveWordFileButton', modalElement).on('click', $.proxy(this._onSaveWordFileClick, this));

		// Add listener to modal hide event
		modalElement.on('hidden.bs.modal', $.proxy(this._destroyModal, this));

		// Initialize bootstrap modal
		modalElement.modal({
			backdrop: 'static',
			keyboard: false,
		});
	}

	_destroyModal()
	{
		let modalElement = $('#editModal', $(this));

		if (modalElement)
		{
			// Remove listeners
			$('#saveWordFileButton', modalElement).off('click');
			modalElement.off('hidden.bs.modal');

			// Destroy everything Kendo
			kendo.destroy(modalElement);

			// Dispose modal
			modalElement.modal('dispose');

			// Remove html
			modalElement.remove();
			modalElement = null;
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('words-files-manager'))
	window.customElements.define('words-files-manager', WordsFilesManager);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/sidebar-layout.js":
/*!******************************************!*\
  !*** ./src/components/sidebar-layout.js ***!
  \******************************************/
/*! exports provided: SidebarLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarLayout", function() { return SidebarLayout; });
class SidebarLayout extends HTMLElement
{
	constructor()
	{
	    super();

		// Attach a shadow root
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				:host {
					display: flex;
					flex-direction: row;
				}

				@media (max-width: 575.98px) {
					:host(.split-xs) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-xs) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 767.98px) {
					:host(.split-sm) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-sm) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 991.98px) {
					:host(.split-md) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-md) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 1199.98px) {
					:host(.split-lg) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-lg) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				.side-col::slotted(*) {
				}

				.main-col::slotted(*) {
					flex-grow: 1;
				}
			</style>

			<slot class="side-col" name="side-column"></slot>
			<slot class="main-col" name="main-column"></slot>
		`;

		// Set initial selection
		this.selectedIndex = 0;
	}

	get selectedPanel()
	{
		return this._selectedPanel;
	}

	set selectedPanel(element) // 'side' or 'main'
	{
		if (element != null && element.parentNode == this)
		{
			this._selectedPanel = element;

			for (let element of this.children)
			{
				if (element == this._selectedPanel)
					element.setAttribute('aria-selected', 'true');
				else
					element.removeAttribute('aria-selected');
			}
		}
		else
		{
			console.error('Element is not a child of SidebarLayout');
		}
	}

	get selectedIndex()
	{
		return Array.from(this.children).indexOf(this._selectedPanel);
	}

	set selectedIndex(index)
	{
		if (this.children.length > 0)
		{
			if (this.children[index] == null)
			{
				console.error('Invalid SidebarLayout index');
				return;
			}

			let element = this.children[index];
			this.selectedPanel = element;
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('sidebar-layout'))
	window.customElements.define('sidebar-layout', SidebarLayout);


/***/ }),

/***/ "./src/modules/zone-configurator.js":
/*!******************************************!*\
  !*** ./src/modules/zone-configurator.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoneConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _components_view_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/view-stack */ "./src/components/view-stack.js");
/* harmony import */ var _components_sidebar_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/sidebar-layout */ "./src/components/sidebar-layout.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");
/* harmony import */ var _components_module_specific_words_files_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/module-specific/words-files-manager */ "./src/components/module-specific/words-files-manager.js");







class ZoneConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('zoneConfig');

		this.ITEM_TYPE_ZONE = 'zone';
		this.ITEM_TYPE_ROOM = 'room';

		// Outgoing requests
		this.REQ_GET_ZONES = 'getZones';

		this.REQ_GET_ZONE_CONFIG = 'getZoneConfig';
		this.REQ_SAVE_ZONE_CONFIG = 'saveZoneConfig';
		this.REQ_NEW_ZONE_CONFIG = 'newZoneConfig';
		this.REQ_DELETE_ZONE_CONFIG = 'delZoneConfig';
		this.REQ_ACTIVATE_ZONE = 'actZone';

		this.REQ_GET_ROOM_CONFIG = 'getRoomConfig';
		this.REQ_SAVE_ROOM_CONFIG = 'saveRoomConfig';
		this.REQ_NEW_ROOM_CONFIG = 'newRoomConfig';
		this.REQ_DELETE_ROOM_CONFIG = 'delRoomConfig';

		this.REQ_REFRESH_WORDS_FILE = 'refreshWordsFiles';
		this.REQ_EDIT_WORDS_FILE = 'editWordsFile';
		this.REQ_SAVE_WORDS_FILE = 'saveWordsFile';
		this.REQ_DELETE_WORDS_FILE = 'delWordsFile';

		// Incoming responses
		this.RESP_ZONES = 'zones';

		this.RESP_ZONE_CONFIG = 'zoneConfig';
		this.RESP_ZONE_CONFIG_UPDATE_CONFIRM = 'zoneCfgUpd';
		this.RESP_ZONE_ADDED = 'zoneAdded';
		this.RESP_ZONE_REFUSED = 'zoneRefused';
		this.RESP_ZONE_DELETED = 'zoneDel';
		this.RESP_ZONE_ACTIVATED = 'zoneAct';
		this.RESP_ZONE_ACTIVATION_ERROR = 'zoneActErr';

		this.RESP_ROOM_CONFIG = 'roomConfig';
		this.RESP_ROOM_CONFIG_UPDATE_CONFIRM = 'roomCfgUpd';
		this.RESP_ROOM_ADDED = 'roomAdded';
		this.RESP_ROOM_REFUSED = 'roomRefused';
		this.RESP_ROOM_DELETED = 'roomDel';

		this.RESP_REFRESH_WORDS_FILES = 'refreshWordsFiles';
		this.RESP_WORDS_FILE_CONTENT = 'wordsFile';
		this.RESP_WORDS_FILE_ERROR = 'wordsFileErr';
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	// This methods override those in BaseModule class.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

		// Create interface builder instance
		this._interfaceBuilder = new _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_3__["ConfigInterfaceBuilder"]();

		// Set listener for custom actions triggered by configuration interface
		$('#znc-tabNavigator').on('value-set', $.proxy(this._onConfigValueSet, this));

		// Initialize Zones/Rooms treeview
		this._treeview = $('#znc-treeView').kendoTreeView({
			loadOnDemand: false,
			dataTextField: 'name',
			template: kendo.template('<span class="# if (!item.active) { # inactive-list-item # } #">#: item.name #</span>'),
			change: $.proxy(this._onZoneRoomChange, this),
		}).data('kendoTreeView');

		// Listen to treeview double-click event
		$('#znc-treeView').on('dblclick', $.proxy(this._onTreeItemDoubleClick, this));

		// Request zones & rooms list to server instance
		this.sendExtensionRequest(this.REQ_GET_ZONES);

		// Initialize progress bar
		$('#znc-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Add listeners to utility buttons
		$('#znc-addZoneButton').on('click', $.proxy(this._onAddZoneClick, this));
		$('#znc-addRoomButton').on('click', $.proxy(this._onAddRoomClick, this));
		$('#znc-editButton').on('click', $.proxy(this._onEditClick, this));
		$('#znc-removeButton').on('click', $.proxy(this._onRemoveClick, this));
		$('#znc-activateButton').on('click', $.proxy(this._onActivateClick, this));

		// Add listener to interface buttons
		$('#znc-cancelButton').on('click', $.proxy(this._onCancelClick, this));
		$('#znc-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#znc-submitButton').on('click', $.proxy(this._onSubmitClick, this));

		// Save ref to words files manager and add custom event listeners
		this._wordsFilesManager = document.getElementById('znc-wordsFilesManager');
		$(this._wordsFilesManager).on(this._wordsFilesManager.REFRESH_WORDS_FILES_CLICK_EVENT, $.proxy(this._onWordsFileReloadClick, this));
		$(this._wordsFilesManager).on(this._wordsFilesManager.EDIT_WORDS_FILE_CLICK_EVENT, $.proxy(this._onWordsFileEditClick, this));
		$(this._wordsFilesManager).on(this._wordsFilesManager.SAVE_WORDS_FILE_CLICK_EVENT, $.proxy(this._onWordsFileSaveClick, this));
		$(this._wordsFilesManager).on(this._wordsFilesManager.REMOVE_WORDS_FILE_CLICK_EVENT, $.proxy(this._onWordsFileRemoveClick, this));
		$(this._wordsFilesManager).on(this._wordsFilesManager.ASSIGN_WORDS_FILE_CLICK_EVENT, $.proxy(this._onWordsFileAssignClick, this));
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Remove tree view doubleclick listener
		$('#znc-treeView').off('dblclick');

		// Remove listener for custom actions triggered by configuration interface
		$('#znc-tabNavigator').off('value-set');

		// Remove listener for zone/room activation event
		$('#znc-addZoneButton').off('click');
		$('#znc-addRoomButton').off('click');
		$('#znc-editButton').off('click');
		$('#znc-removeButton').off('click');
		$('#znc-activateButton').off('click');

		// Remove interface buttons click listeners
		$('#znc-cancelButton').off('click');
		$('#znc-reloadButton').off('click');
		$('#znc-submitButton').off('click');

		// Remove listeners to words files manager
		$(this._wordsFilesManager).off(this._wordsFilesManager.REFRESH_WORDS_FILES_CLICK_EVENT);
		$(this._wordsFilesManager).off(this._wordsFilesManager.EDIT_WORDS_FILE_CLICK_EVENT);
		$(this._wordsFilesManager).off(this._wordsFilesManager.SAVE_WORDS_FILE_CLICK_EVENT);
		$(this._wordsFilesManager).off(this._wordsFilesManager.REMOVE_WORDS_FILE_CLICK_EVENT);
		$(this._wordsFilesManager).off(this._wordsFilesManager.ASSIGN_WORDS_FILE_CLICK_EVENT);

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		const username = data.getUtfString('user');

		/****** ZONES & ROOMS ******/

		// Zones & rooms list received
		if (command == this.RESP_ZONES)
			this._populateTree(data);

		// Zone or room configuration data received
		else if (command == this.RESP_ZONE_CONFIG || command == this.RESP_ROOM_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'znc-tabNavigator', false);

			// Enable scrolling tabs (if needed)
			if (this._reinitTabs)
			{
				$('#znc-tabNavigator #tabs').scrollingTabs({
					bootstrapVersion: 4,
					scrollToTabEdge: true,
					enableSwiping: true,
					disableScrollArrowsOnFullyScrolled: true,
					cssClassLeftArrow: 'fa fa-chevron-left',
					cssClassRightArrow: 'fa fa-chevron-right'
				});
			}

			// Enable interface
			this._enableConfigInterface(true);
		}

		/****** ZONES ******/

		// Zone configuration update confirmation
		else if (command == this.RESP_ZONE_CONFIG_UPDATE_CONFIRM)
		{
			// If a 'name' parameter is received, it means the zone name changed, and we have to update the zones list
			if (data.getUtfString('zName') != null)
				this._updateZoneNameInList(data.getInt('zId'), data.getUtfString('zName'));

			// If the current user is the updater, show a notification; otherwise, show a dialog box suggesting to reload
			if (username == this.smartFox.mySelf.name)
			{
				// Enable interface
				this._enableConfigInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Zone modified', `Zone settings updated successfully; changes will be applied on next <strong>server restart</strong>`);

				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same zone
				if (data.getInt('zId') == this._editedZoneId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has modified the Zone you are currently editing; please reload to update your view.`);

					// Disable submit button
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					if (data.getUtfString('zName') != null)
						this.shellCtrl.showNotification('Zone renamed', `Administrator ${username} has changed the name on one of the Zones`);
				}
			}
		}

		// New zone added
		else if (command == this.RESP_ZONE_ADDED)
		{
			const zoneName = data.getSFSObject('zone').getUtfString('name');

			// If the current user is the updater, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Reset interface
				this._onCancelClick();

				// Display notification
				this.shellCtrl.showNotification('Zone added', `Zone '${zoneName}' created successfully`);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification('Zone added', `Administrator ${username} created Zone '${zoneName}'`);
			}

			// Add new zone to tree
			let zonesDS = this._treeview.dataSource;
			zonesDS.add(this._createZoneObject(data.getSFSObject('zone')));
			zonesDS.sync();
		}

		// New zone creation refused due to invalid zone name
		else if (command == this.RESP_ZONE_REFUSED)
		{
			// Re-enable interface
			this._enableConfigInterface(true);

			// Show warning
			this.shellCtrl.showSimpleAlert('Zone configuration can\'t be saved because another Zone with the same name already exists.', true);
		}

		// Existing zone deleted
		else if (command == this.RESP_ZONE_DELETED)
		{
			// If the current user is the deleter, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Re-enable interface
				this._enableListInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Zone removed', `Zone '${data.getUtfString('zName')}' deleted successfully`);
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same zone
				if (data.getInt('zId') == this._editedZoneId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has deleted the Zone you are currently modifying; you have to cancel your editing.`);

					// Disable submit and reload buttons
					$('#znc-reloadButton').attr('disabled', true);
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					this.shellCtrl.showNotification('Zone removed', `Administrator ${username} deleted Zone '${data.getUtfString('zName')}'`);
				}
			}

			// Reset selection if the currently selected item or its parent is being removed
			let selectedNode = this._treeview.select();
			let selectedDataItem = this._treeview.dataItem(selectedNode);
			if (selectedDataItem)
			{
				if (selectedDataItem.type == this.ITEM_TYPE_ZONE && selectedDataItem.id == data.getInt('zId'))
					this._deselectTreeItem();

				if (selectedDataItem.type == this.ITEM_TYPE_ROOM)
				{
					let parentDataItem = this._treeview.dataItem(this._treeview.parent(selectedNode));

					if (parentDataItem.id == data.getInt('zId'))
						this._deselectTreeItem();
				}
			}

			// Remove zone from tree
			let dataItem = this._getZoneDataItemById(data.getInt('zId'));
			let zonesDS = this._treeview.dataSource;
			zonesDS.remove(dataItem);
			zonesDS.sync();
		}

		// Zone activated
		else if (command == this.RESP_ZONE_ACTIVATED)
		{
			// Set zone activation status
			const zoneName = this._setZoneActivationStatus(data.getInt('zId'), data.getUtfString('actRooms'), true);

			// Display notification
			if (username == this.smartFox.mySelf.name)
				this.shellCtrl.showNotification('Zone activated', `Zone '${zoneName}' activated successfully`);
			else
				this.shellCtrl.showNotification('Zone activated', `Administrator ${username} activated Zone '${zoneName}'`);
		}

		// Zone activation error
		else if (command == this.RESP_ZONE_ACTIVATION_ERROR)
		{
			// Set zone activation status
			this._setZoneActivationStatus(data.getInt('zId'), '', false);

			// Show alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'), true);
		}

		/****** ROOMS ******/

		// Room configuration update confirmation
		else if (command == this.RESP_ROOM_CONFIG_UPDATE_CONFIRM)
		{
			if (data.getUtfString('rName') != null)
				this._updateRoomNameInList(data.getInt('zId'), data.getInt('rId'), data.getUtfString('rName'));

			// If the current user is the updater, show a notification; otherwise, show a dialog box suggesting to reload
			if (username == this.smartFox.mySelf.name)
			{
				// Enable interface
				this._enableConfigInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Room modified', `Room settings updated successfully; changes will be applied on next <strong>server restart</strong>`);

				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same room
				if (data.getInt('rId') == this._editedRoomId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has modified the Room you are currently editing; please reload to update your view.`);

					// Disable submit button
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					if (data.getUtfString('rName') != null)
						this.shellCtrl.showNotification('Room renamed', `Administrator ${username} has changed the name on one of the Rooms`);
				}
			}
		}

		// New room added
		else if (command == this.RESP_ROOM_ADDED)
		{
			const roomData = data.getSFSObject('room');
			const zoneId = data.getInt('zId');

			let zonesDS = this._treeview.dataSource;
			let zoneItem = zonesDS.get(zoneId);

			// If the current user is the updater, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Reset interface
				this._onCancelClick();

				// Display notification
				this.shellCtrl.showNotification('Room added', `Room '${roomData.getUtfString('name')}' created successfully`);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification('Room added', `Administrator ${username} created Room '${roomData.getUtfString('name')}' in Zone '${zoneItem.name}'`);
			}

			// Add new room to tree
			zoneItem.append(this._createRoomObject(roomData, zoneId));
			zonesDS.sync();

			// Expand zone node where room was added
			this._treeview.expand(this._treeview.select());
		}

		// New room creation refused due to invalid room name
		else if (command == this.RESP_ROOM_REFUSED)
		{
			// Re-enable interface
			this._enableConfigInterface(true);

			// Show warning
			this.shellCtrl.showSimpleAlert('Room configuration can\'t be saved because another Room with the same name already exists.', true);
		}

		// Existing room deleted
		else if (command == this.RESP_ROOM_DELETED)
		{
			let zoneItem = this._getZoneDataItemById(data.getInt('zId'));
			let roomItem = this._getRoomDataItemById(data.getInt('zId'), data.getInt('rId'));

			// If the current user is the deleter, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Re-enable interface
				this._enableListInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Room removed', `Room '${roomItem.name}' deleted successfully`);
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same room
				if (data.getInt('rId') == this._editedRoomId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has deleted the Room you are currently modifying; you have to cancel your editing.`);

					// Disable submit and reload buttons
					$('#znc-reloadButton').attr('disabled', true);
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					this.shellCtrl.showNotification('Room removed', `Administrator ${username} deleted Room '${roomItem.name}' from Zone '${zoneItem.name}'`);
				}
			}

			// Reset selection if the currently selected item or its parent is being removed
			let selectedNode = this._treeview.select();
			let selectedDataItem = this._treeview.dataItem(selectedNode);
			if (selectedDataItem)
			{
				if (selectedDataItem.type == this.ITEM_TYPE_ROOM && selectedDataItem.id == data.getInt('rId'))
					this._deselectTreeItem();
			}

			// Remove room from tree
			zoneItem.children.remove(roomItem);
			this._treeview.dataSource.sync();
		}

		/****** WORDS FILES ******/

		// Words files list received
		else if (command == this.RESP_REFRESH_WORDS_FILES)
		{
			this._wordsFilesManager.refreshWordsFilesList(data.getSFSArray('wf'), username == this.smartFox.mySelf.name);

			// If another user caused a refresh (for example deleting a file, or adding a new one) show a notification
			if (username != null && username != this.smartFox.mySelf.name && this._editedZoneId > -1)
				this.shellCtrl.showNotification('Words files modified', `Administrator ${username} has added, modified or deleted a words file.`);
		}

		// Words file content received
		else if (command == this.RESP_WORDS_FILE_CONTENT)
		{
			this._wordsFilesManager.editWordsFile(data.getUtfString('filename'), data.getText('content'));
		}

		// Words file error (edit/save)
		else if (command == this.RESP_WORDS_FILE_ERROR)
		{
			// Enable buttons
			this._wordsFilesManager.enabled = true;

			// Show alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'), true);
		}

		// else if ()
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onTreeItemDoubleClick(e)
	{
		// Get event target's closest tree node
		let treeNode = $(e.target).closest('.k-item[role=treeitem]');

		// Get associated data item
		let dataItem = this._treeview.dataItem(treeNode);

		// Load configuration
		this._loadConfiguration(dataItem.type);
	}

	_onZoneRoomChange()
	{
		// Reset utility buttons
		this._setUtilityButtonsState(this._selectedItem);
	}

	// Utility buttons listeners

	_onAddZoneClick()
	{
		// Deselect list item
		this._deselectTreeItem();

		// Load configuration
		this._loadConfiguration(this.ITEM_TYPE_ZONE);
	}

	_onAddRoomClick()
	{
		// Select parent list item
		this._selectParentTreeItem();

		// Load configuration
		this._loadConfiguration(this.ITEM_TYPE_ROOM);
	}

	_onEditClick()
	{
		// Load configuration
		this._loadConfiguration(this._selectedItem.type);
	}

	_onRemoveClick()
	{
		this.shellCtrl.showConfirmWarning(`Are you sure you want to delete the selected ${this._selectedItem.type == this.ITEM_TYPE_ZONE ? 'Zone' : 'Room'} configuration?`, $.proxy(this._onRemoveConfirm, this));
	}

	_onRemoveConfirm()
	{
		// Disable zone/room selection list
		this._enableListInterface(false);

		let params = new SFS2X.SFSObject();

		// Request zone removal
		if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
		{
			params.putInt('zId', this._selectedItem.id);
			this.sendExtensionRequest(this.REQ_DELETE_ZONE_CONFIG, params);
		}
		else
		{
			params.putInt('zId', this._selectedItemParent.id);
			params.putInt('rId', this._selectedItem.id);
			this.sendExtensionRequest(this.REQ_DELETE_ROOM_CONFIG, params);
		}
	}

	_onActivateClick()
	{
		// Get selected data item
		if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
		{
			let params = new SFS2X.SFSObject();
			params.putInt('zId', this._selectedItem.id);

			this.sendExtensionRequest(this.REQ_ACTIVATE_ZONE, params);
		}
	}

	// Configuration buttons listeners

	_onCancelClick()
	{
		// Enable zone/room selection lists
		this._enableListInterface(true);

		// Disable configuration interface
		this._enableConfigInterface(false);

		// Clear main container
		this._resetTabsContainer(false, true);

		// Set isEditing flag
		this._isEditing = false;
		this._editedItemType = '';

		// Switch panel
		this._switchPanel('znc-sidebarPanel');
	}

	_onReloadClick()
	{
		// Hide validation messages
		this._interfaceBuilder.resetValidation();

		// Reload configuration
		this._loadConfiguration(this._editedItemType, false);
	}

	_onSubmitClick()
	{
		// Check validity
		if (this._interfaceBuilder.checkIsValid())
		{
			let changes = this._interfaceBuilder.getChangedData();

			if (changes.size() > 0)
			{
				//console.log(changes.getDump())

				// In case the zone/room name changed, check it against the list (duplicate names not allowed!)
				if (this._validateName(changes))
				{
					// Disable configuration interface
					this._enableConfigInterface(false);

					// Send settings to server instance
					let params = new SFS2X.SFSObject();
					params.putSFSArray('settings', changes);
					params.putBool('backup', $('#znc-backupCheck').prop('checked'));
					params.putInt('zId', this._editedZoneId);
					params.putInt('rId', this._editedRoomId);

					if (this._editedItemType == this.ITEM_TYPE_ZONE)
					{
						// Submit zone settings
						if (this._editedZoneId > -1)
							this.sendExtensionRequest(this.REQ_SAVE_ZONE_CONFIG, params);
						else
							this.sendExtensionRequest(this.REQ_NEW_ZONE_CONFIG, params);
					}
					else
					{
						// Submit room settings
						if (this._editedRoomId > -1)
							this.sendExtensionRequest(this.REQ_SAVE_ROOM_CONFIG, params);
						else
							this.sendExtensionRequest(this.REQ_NEW_ROOM_CONFIG, params);
					}
				}
				else
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Unable to submit configuration because the ${Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["capitalizeFirst"])(this._editedItemType)} name already exists; duplicate names are not allowed.`, true);
				}
			}
		}
		else
		{
			// Show alert
			this.shellCtrl.showSimpleAlert('Unable to submit configuration changes due to an invalid value; please verify the highlighted form fields in all tabs.', true);
		}
	}

	_onConfigValueSet(e) // SAME METHOD DUPLICATED IN zone-monitor.js
	{
		const configParam = e.target.data;

		// Handle extension name/type dropdowns update and update the main class dropdown datasource accordingly
		if (configParam.name == 'extension.name' || configParam.name == 'extension.type' || configParam.name == 'extension.filterClass')
		{
			// All involved ConfigFormItems must be available and initialized to proceed
			const nameFormItem = this._interfaceBuilder.getConfigFormItem('extension.name');
			const typeFormItem = this._interfaceBuilder.getConfigFormItem('extension.type');
			const classFormItem = this._interfaceBuilder.getConfigFormItem('extension.file');
			const filterFormItem = this._interfaceBuilder.getConfigFormItem('extension.filterClass');

			if (nameFormItem != null && typeFormItem != null && classFormItem != null && filterFormItem != null)
			{
				const source = nameFormItem.data;
				let classesList = [];

				let data = source.triggerData;
				for (let i = 0; i < data.size(); i++)
				{
					let ext = data.getSFSObject(i);

					if (ext.getUtfString('name') == nameFormItem.data.value && ext.getUtfString('type') == typeFormItem.data.value)
					{
						let classes = ext.getUtfString('classesString').split(',');

						if (filterFormItem.data.value == true)
						{
							let filteredClasses = classes.filter(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["filterClassName"]);
							classes = filteredClasses;
						}

						classesList = classesList.concat(classes);
					}
				}

				let currentClass = classFormItem.data.value;

				// If the classes list doesn't contain the current value, create an empty entry and reset the value
				if (classesList.indexOf(currentClass) < 0)
				{
					if (classesList.length == 0)
					{
						classesList.push('');
						currentClass = '';
					}
					else
						currentClass = classesList[0];
				}

				let mainClassDropDown = classFormItem._innerWidget;
				mainClassDropDown.setDataSource(classesList);

				classFormItem.data.value = currentClass;
				classFormItem._setWidgetValue();
			}
		}
	}

	_onWordsFileReloadClick(evt)
	{
		// Send request to server
		this.sendExtensionRequest(this.REQ_REFRESH_WORDS_FILE);
	}

	_onWordsFileEditClick(evt)
	{
		// Send request to server
		let params = new SFS2X.SFSObject();
		params.putUtfString('filename', evt.detail);
		this.sendExtensionRequest(this.REQ_EDIT_WORDS_FILE, params);
	}

	_onWordsFileSaveClick(evt)
	{
		this._tempWordsFileData = evt.detail;

		// Check if a new file is being created
		if (this._tempWordsFileData.isNew)
		{
			// If yes, check if name already exists
			if (this._wordsFilesManager.getExistingFilenames().includes(this._tempWordsFileData.filename))
			{
				// Show confirm dialog
				this.shellCtrl.showConfirmWarning('A words file with the entered name already exists; do you want to proceed anyway? The existing file will be overwritten.', $.proxy(this._onWordsFileSaveConfirm, this));
				return;
			}
		}

		// Proceed
		this._onWordsFileSaveConfirm();
	}

	_onWordsFileSaveConfirm()
	{
		// Disable words files manager buttons
		this._wordsFilesManager.enabled = false;
		this._wordsFilesManager.saveSpinnerVisible = true;

		// Send request to server
		let params = new SFS2X.SFSObject();
		params.putUtfString('filename', this._tempWordsFileData.filename);
		params.putText('content', this._tempWordsFileData.content);
		this.sendExtensionRequest(this.REQ_SAVE_WORDS_FILE, params);
	}

	_onWordsFileRemoveClick(evt)
	{
		this.shellCtrl.showConfirmWarning('Are you sure you want to delete the selected words file?', $.proxy(this._onWordsFileRemoveConfirm, this));
	}

	_onWordsFileRemoveConfirm()
	{
		let wordsFile = this._wordsFilesManager.getSelectedWordsFileName();

		if (wordsFile != null)
		{
			// Disable words files manager buttons
 			this._wordsFilesManager.enabled = false;
			this._wordsFilesManager.actionSpinnerVisible = true;

			// Send request to server
			let params = new SFS2X.SFSObject();
			params.putUtfString('filename', wordsFile);
			this.sendExtensionRequest(this.REQ_DELETE_WORDS_FILE, params);
		}
	}

	_onWordsFileAssignClick(evt)
	{
		let path = evt.detail;

		// Write path of the selected words file in "wordsFilter.wordsFile" dynamically created field
		const wordsFileFormItem = this._interfaceBuilder.getConfigFormItem('wordsFilter.wordsFile');
		wordsFileFormItem.data.value = path;
		wordsFileFormItem._setWidgetValue();
	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_enableListInterface(enabled)
	{
		$('#znc-utilButtons').attr('disabled', !enabled);
		$('#znc-treeView').attr('disabled', !enabled);
	}

	_setUtilityButtonsState(dataItem = null)
	{
		let disable = true;

		if (dataItem)
		{
			// Enable 'activate zone' button if zone is inactive
			$('#znc-activateButton').attr('disabled', (dataItem.type != this.ITEM_TYPE_ZONE || dataItem.active));

			disable = false;
		}
		else
		{
			// Disable 'activate zone' button
			$('#znc-activateButton').attr('disabled', true);
		}

		// Enable/disable other utility buttons
		$('#znc-addZoneButton').attr('disabled', false); // Always enabled
		$('#znc-addRoomButton').attr('disabled', disable);
		$('#znc-editButton').attr('disabled', disable);
		$('#znc-removeButton').attr('disabled', disable);
	}

	_enableConfigInterface(enabled)
	{
		$('#znc-cancelButton').attr('disabled', !enabled);
		$('#znc-reloadButton').attr('disabled', !enabled);
		$('#znc-submitButton').attr('disabled', !enabled);
		$('#znc-backupCheck').attr('disabled', !enabled);

		this._interfaceBuilder.disableInterface(!enabled);

		// Also switch view when enabled
		if (enabled)
			this._switchView('znc-main');
	}

	_switchView(viewId)
	{
		document.getElementById('znc-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#znc-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();

		// Set flag to re-initialize tabs if needed
		this._reinitTabs = true;
	}

	_populateTree(data)
	{
		let zData = data.getSFSArray('zones');

		let zonesArr = [];
		for (let z = 0; z < zData.size(); z++)
			zonesArr.push( this._createZoneObject(zData.getSFSObject(z)) );

		// Create datasource
		let zones = new kendo.data.HierarchicalDataSource({
            data: zonesArr,
			sort: {
				field: 'name',
				dir: 'asc'
			},
            schema: {
                model: {
					id: 'id',
                    children: {
						schema: {
							data: 'rooms',
							sort: {
								field: 'name',
								dir: 'asc'
							}
						}
					}
                }
            }
        });

		// Set tree view dataprovider
		this._treeview.setDataSource(zones);

		// Set utility buttons state (add, remove, edit, etc)
		this._setUtilityButtonsState();
	}

	_createZoneObject(zoneData)
	{
		let zone = {
			type: this.ITEM_TYPE_ZONE,
			name: zoneData.getUtfString('name'),
			id: zoneData.getInt('id'),
			active: zoneData.getBool('act')
		}

		// Create rooms list dataprovider
		let rData = zoneData.getSFSArray('rooms');

		let roomsArr = [];
		for (let r = 0; r < rData.size(); r++)
			roomsArr.push( this._createRoomObject(rData.getSFSObject(r), zoneData.getInt('id')) );

		zone.rooms = roomsArr;

		return zone;
	}

	_createRoomObject(roomData, zoneId)
	{
		let room = {
			type: this.ITEM_TYPE_ROOM,
			name: roomData.getUtfString('name'),
			id: roomData.getInt('id'),
			active: roomData.getBool('act'),
			parentId: zoneId,
			spriteCssClass: this._getRoomListIconCssClass(roomData.getBool('act'))
		};

		return room;
	}

	_getRoomListIconCssClass(isActive)
	{
		return isActive ? 'fas fa-door-open' : 'fas fa-door-closed inactive-list-item';
	}

	_setZoneActivationStatus(zoneId, activeRooms, isActive)
	{
		let zoneDI = this._getZoneDataItemById(zoneId);

		zoneDI.active = isActive;

		let activeRoomsArr = activeRooms.split(',');

		if (zoneDI.hasChildren)
		{
			for (let i = 0; i < zoneDI.children.data().length; i++)
			{
				let room = zoneDI.children.data()[i];
				room.active = (isActive && activeRoomsArr.indexOf(room.name) > -1);
				room.spriteCssClass = this._getRoomListIconCssClass(room.active)
			}
		}

		// Refresh list
		this._treeview.dataSource.sync();

		// Return zone name
		return zoneDI.name;
	}

	_deselectTreeItem()
	{
		this._treeview.select($());
	}

	_selectParentTreeItem()
	{
		let selectedNode = this._treeview.select();
		let selectedDataItem = this._treeview.dataItem(selectedNode);

		if (selectedDataItem.type == this.ITEM_TYPE_ROOM)
		{
			let parentNode = this._treeview.parent(selectedNode);
			this._treeview.select(parentNode);
		}
	}

	_loadConfiguration(type, resetTabs = true)
	{
		// Disable zone/room selection list
		this._enableListInterface(false);

		// Disable configuration interface
		this._enableConfigInterface(false);

		// Clear main container
		this._resetTabsContainer(true, resetTabs);

		// Set isEditing flag
		this._isEditing = true;
		this._editedItemType = type;

		// Request zone or room configuration data to server instance
		let params = new SFS2X.SFSObject();
		params.putInt('zId', this._editedZoneId);
		params.putInt('rId', this._editedRoomId);

		// If no room is selected, then we are editing a zone
		if (this._editedItemType == this.ITEM_TYPE_ZONE)
			this.sendExtensionRequest(this.REQ_GET_ZONE_CONFIG, params);
		else
			this.sendExtensionRequest(this.REQ_GET_ROOM_CONFIG, params);

		// Switch panel
		this._switchPanel('znc-mainPanel');
	}

	_resetTabsContainer(isLoading, resetTabs)
	{
		if (resetTabs)
			this._clearTabs();
		else
			this._reinitTabs = false;

		if (!isLoading)
			this._switchView('znc-select');
		else
			this._switchView('znc-loading');
	}

	_switchPanel(panelId)
	{
		document.getElementById('znc-view').selectedPanel = document.getElementById(panelId);
	}

	_getZoneDataItemById(zoneId)
	{
		let zonesDS = this._treeview.dataSource;
		return zonesDS.get(zoneId);
	}

	_getRoomDataItemById(zoneId, roomId)
	{
		let zoneDI = this._getZoneDataItemById(zoneId);

		if (zoneDI.hasChildren)
			return zoneDI.children.get(roomId);

		return null;
	}

	_updateZoneNameInList(zoneId, zoneName)
	{
		this._getZoneDataItemById(zoneId).name = zoneName;
		this._treeview.dataSource.sync();
	}

	_updateRoomNameInList(zoneId, roomId, roomName)
	{
		this._getRoomDataItemById(zoneId, roomId).name = roomName;
		this._treeview.dataSource.sync();
	}

	_validateName(changes)
	{
		const zoneId = this._editedZoneId;

		for (let i = 0; i < changes.size(); i++)
		{
			const setting = changes.getSFSObject(i);

			if (setting.containsKey('name') && setting.getUtfString('name') == 'name')
			{
				// Get name value
				const name = setting.getText('value');

				// Get data source
				let ds = [];

				if (this._editedItemType == this.ITEM_TYPE_ZONE)
					ds = this._treeview.dataSource.data();
				else
				{
					if (this._getZoneDataItemById(zoneId).hasChildren)
						ds = this._getZoneDataItemById(zoneId).children.data();
				}


				// Check if name exists in data source
				for (let j = 0; j < ds.length; j++)
				{
					if (ds[j].name == name)
					{
						return false;
					}
				}

				break;
			}
		}

		return true;
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------

	get _selectedItem()
	{
		return this._treeview.dataItem(this._treeview.select());
	}

	get _selectedItemParent()
	{
		let selectedNode = this._treeview.select();
		let parentNode = this._treeview.parent(selectedNode);

		return this._treeview.dataItem(parentNode);
	}

	get _editedZoneId()
	{
		if (this._isEditing && this._selectedItem)
		{
			if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
				return this._selectedItem.id;
			else
				return this._selectedItemParent.id;
		}

		return -1;
	}

	get _editedRoomId()
	{
		if (this._isEditing && this._selectedItem)
		{
			if (this._selectedItem.type == this.ITEM_TYPE_ROOM)
				return this._selectedItem.id;
		}

		return -1;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTIuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy9tb2R1bGUtc3BlY2lmaWMvd29yZHMtZmlsZXMtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3NpZGViYXItbGF5b3V0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL21vZHVsZXMvem9uZS1jb25maWd1cmF0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtieXRlc1RvU2l6ZX0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbGl0aWVzJztcblxuZXhwb3J0IGNsYXNzIFdvcmRzRmlsZXNNYW5hZ2VyIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0dGhpcy5SRUZSRVNIX1dPUkRTX0ZJTEVTX0NMSUNLX0VWRU5UID0gJ3JlZnJlc2hXb3Jkc0ZpbGVzQ2xpY2snO1xuXHRcdHRoaXMuRURJVF9XT1JEU19GSUxFX0NMSUNLX0VWRU5UID0gJ2VkaXRXb3Jkc0ZpbGVDbGljayc7XG5cdFx0dGhpcy5TQVZFX1dPUkRTX0ZJTEVfQ0xJQ0tfRVZFTlQgPSAnc2F2ZVdvcmRzRmlsZUNsaWNrJztcblx0XHR0aGlzLlJFTU9WRV9XT1JEU19GSUxFX0NMSUNLX0VWRU5UID0gJ3JlbW92ZVdvcmRzRmlsZUNsaWNrJztcblx0XHR0aGlzLkFTU0lHTl9XT1JEU19GSUxFX0NMSUNLX0VWRU5UID0gJ2Fzc2luZ1dvcmRzRmlsZUNsaWNrJztcblxuXHRcdHRoaXMuQ09ORklHX0ZPTERFUiA9ICdjb25maWcvJztcblx0XHR0aGlzLldPUkRTX0ZJTEVfRVhUID0gJy53b3Jkcy50eHQnO1xuXG5cdFx0dGhpcy5fbW9kYWxIdG1sID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsXCIgaWQ9XCJlZGl0TW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImVkaXRNb2RhbFRpdGxlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg1IGNsYXNzPVwibW9kYWwtdGl0bGUgdGV4dC1wcmltYXJ5XCIgaWQ9XCJlZGl0TW9kYWxUaXRsZVwiPldvcmQgRmlsZSBFZGl0b3I8L2g1PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgaW4tZmxvdy1pbnZhbGlkLW1zZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZmllbGRzZXQgaWQ9XCJlZGl0RmllbGRzZXRcIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJmaWxlbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkZpbGVuYW1lIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIk5hbWUgb2YgdGhlIHdvcmRzIGZpbGUuIFRoZSBmaWxlIHdpbGwgYmUgc2F2ZWQgaW4gc2VydmVyJ3MgPGVtPmNvbmZpZzwvZW0+IGZvbGRlci5cIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaWxlbmFtZVwiIG5hbWU9XCJmaWxlbmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGstdGV4dGJveFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlcXVpcmVkIGRhdGEtcmVxdWlyZWQtbXNnPVwiUmVxdWlyZWRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiZXh0ZW5zaW9uXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIiBpZD1cImV4dGVuc2lvblwiPi53b3Jkcy50eHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJmaWxlbmFtZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbnRlbnRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5Db250ZW50IDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIkVudGVyIGEgd29yZCBvciBhIHZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbiBwZXIgbGluZS4gU2VlIGNvbmZpZ3VyYXRpb24ncyA8ZW0+V29yZHMgZmlsZTwvZW0+IGZpZWxkIGRlc2NyaXB0aW9uIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBpZD1cImNvbnRlbnRcIiBuYW1lPVwiY29udGVudFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGstdGV4dGFyZWEgdy0xMDBcIiByb3dzPVwiMTBcIj48L3RleHRhcmVhPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJjb250ZW50XCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgZmxleC1jb2x1bW5cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMSB0ZXh0LWxlZnRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gaWQ9XCJzYXZlV29yZEZpbGVCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnlcIj48aSBjbGFzcz1cImZhcyBmYS1zYXZlIG1yLTFcIj48L2k+U2F2ZSB3b3JkIGZpbGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxpIGlkPVwic2F2ZVNwaW5uZXJcIiBjbGFzcz1cImZhcyBmYS1jaXJjbGUtbm90Y2ggZmEtc3BpbiB0ZXh0LXByaW1hcnkgYWxpZ24tbWlkZGxlIG1sLTFcIj48L2k+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xIHRleHQtcmlnaHRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdCQodGhpcykuYXBwZW5kKGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtc20tNSBjb2wtbGctNCBjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCI+QXZhaWxhYmxlIHdvcmRzIGZpbGVzIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIlRoZSBsaXN0IG9mIHdvcmRzIGZpbGVzIGZvdW5kIGluIHNlcnZlcidzIDxlbT5jb25maWc8L2VtPiBmb2xkZXIuIENsaWNrIG9uIHRoZSBBc3NpZ24gYnV0dG9uIHRvIHNldCB0aGUgPHN0cm9uZz5Xb3JkcyBmaWxlPC9zdHJvbmc+IGZpZWxkIHRvIHRoZSBzZWxlY3RlZCBmaWxlLiBDb25maWd1cmF0aW9uIHN1Ym1pc3Npb24gaXMgdGhlbiByZXF1aXJlZCB0byBzYXZlIHRoZSBuZXcgdmFsdWUuXCI+PC9pPjwvbGFiZWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXQgYWxpZ24tc2VsZi1jZW50ZXIgY29sLXNtXCI+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGRpdiBpZD1cIndvcmRzRmlsZXNcIiBjbGFzcz1cImxpbWl0ZWQtaGVpZ2h0XCI+PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBpZD1cImFjdGlvbkJ1dHRvbnNcIiBjbGFzcz1cIm10LTIgdGV4dC1yaWdodFwiIGRpc2FibGVkPlxuXHRcdFx0XHRcdFx0PGkgaWQ9XCJhY3Rpb25TcGlubmVyXCIgY2xhc3M9XCJmYXMgZmEtY2lyY2xlLW5vdGNoIGZhLXNwaW4gdGV4dC1wcmltYXJ5IGFsaWduLW1pZGRsZVwiPjwvaT5cblx0XHRcdFx0XHRcdDxidXR0b24gaWQ9XCJyZWZyZXNoQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1zZWNvbmRhcnkgbWwtMlwiIHRpdGxlPVwiUmVmcmVzaFwiPjxpIGNsYXNzPVwiZmFzIGZhLXJlZG8tYWx0XCI+PC9pPjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBpZD1cImFkZEJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstc2Vjb25kYXJ5IG1sLTJcIiB0aXRsZT1cIkFkZFwiPjxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGlkPVwiZWRpdEJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstc2Vjb25kYXJ5IG1sLTJcIiB0aXRsZT1cIkVkaXRcIiBkaXNhYmxlZD48aSBjbGFzcz1cImZhcyBmYS1wZW5cIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGlkPVwicmVtb3ZlQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1zZWNvbmRhcnkgbWwtMlwiIHRpdGxlPVwiUmVtb3ZlXCIgZGlzYWJsZWQ+PGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGlkPVwiYXNzaWduQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1zZWNvbmRhcnkgbWwtMlwiIHRpdGxlPVwiQXNzaWduXCIgZGlzYWJsZWQ+PGkgY2xhc3M9XCJmYXMgZmEtY29tcHJlc3MtYXJyb3dzLWFsdFwiPjwvaT48L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBncmlkXG5cdFx0dGhpcy5fd29yZHNGaWxlc0dyaWQgPSAkKCcjd29yZHNGaWxlcycsICQodGhpcykpLmtlbmRvR3JpZCh7XG5cdFx0XHRyZXNpemFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RhYmxlOiAncm93Jyxcblx0XHRcdGNoYW5nZTogJC5wcm94eSh0aGlzLl9vbldvcmRzRmlsZXNHcmlkU2VsZWN0aW9uQ2hhbmdlLCB0aGlzKSxcblx0XHRcdGNvbHVtbnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZpZWxkOiAnbmFtZScsXG5cdFx0XHRcdFx0dGl0bGU6ICdGaWxlbmFtZScsXG5cdFx0XHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmllbGQ6ICdkYXRlJyxcblx0XHRcdFx0XHR0aXRsZTogJ0RhdGUnLFxuXHRcdFx0XHRcdHdpZHRoOiA4MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmllbGQ6ICdzaXplJyxcblx0XHRcdFx0XHR0aXRsZTogJ1NpemUnLFxuXHRcdFx0XHRcdHdpZHRoOiA4MFxuXHRcdFx0XHR9XG5cdFx0XHRdLFxuXHRcdFx0bm9SZWNvcmRzOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiAnTm8gZmlsZXMuJ1xuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvR3JpZCcpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBidXR0b24gY2xpY2tzXG5cdFx0JCgnI3JlZnJlc2hCdXR0b24nLCAkKHRoaXMpKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjYWRkQnV0dG9uJywgJCh0aGlzKSkub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFkZENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2VkaXRCdXR0b24nLCAkKHRoaXMpKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRWRpdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3JlbW92ZUJ1dHRvbicsICQodGhpcykpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SZW1vdmVDbGljaywgdGhpcykpO1xuXHRcdCQoJyNhc3NpZ25CdXR0b24nLCAkKHRoaXMpKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQXNzaWduQ2xpY2ssIHRoaXMpKTtcblx0fVxuXG5cdGRlc3Ryb3koKVxuXHR7XG5cdFx0Ly8gRGVzdHJveSBncmlkXG5cdFx0dGhpcy5fd29yZHNGaWxlc0dyaWQuZGVzdHJveSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuXHRcdCQoJyNyZWZyZXNoQnV0dG9uJywgJCh0aGlzKSkub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNhZGRCdXR0b24nLCAkKHRoaXMpKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2VkaXRCdXR0b24nLCAkKHRoaXMpKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3JlbW92ZUJ1dHRvbicsICQodGhpcykpLm9mZignY2xpY2snKTtcblx0XHQkKCcjYXNzaWduQnV0dG9uJywgJCh0aGlzKSkub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gSGlkZSBtb2RhbCAod2hpY2ggaW4gdHVybiBkZXN0cm95cyBpdClcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI2VkaXRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0aWYgKG1vZGFsRWxlbWVudClcblx0XHRcdG1vZGFsRWxlbWVudC5tb2RhbCgnaGlkZScpO1xuXHR9XG5cblx0Z2V0IGVuYWJsZWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lzRW5hYmxlZDtcblx0fVxuXG5cdHNldCBlbmFibGVkKHZhbHVlKVxuXHR7XG5cdFx0dGhpcy5faXNFbmFibGVkID0gdmFsdWU7XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSBidXR0b25zXG5cdFx0JCgnI2FjdGlvbkJ1dHRvbnMnLCB0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG5cblx0XHQvLyBIaWRlIHNwaW5uZXJcblx0XHRpZiAodmFsdWUpXG5cdFx0XHR0aGlzLmFjdGlvblNwaW5uZXJWaXNpYmxlID0gZmFsc2U7XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSBtb2RhbFxuXHRcdGxldCBtb2RhbEVsZW1lbnQgPSAkKCcjZWRpdE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIERpc2FibGUgbW9kYWwgY2xvc2UgYnV0dG9uc1xuXHRcdFx0JCgnYnV0dG9uW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgbW9kYWxFbGVtZW50KS5hdHRyKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG5cblx0XHRcdC8vIERpc2FibGUgc2F2ZSBidXR0b25cblx0XHRcdCQoJyNzYXZlV29yZEZpbGVCdXR0b24nLCBtb2RhbEVsZW1lbnQpLmF0dHIoJ2Rpc2FibGVkJywgIXZhbHVlKTtcblxuXHRcdFx0Ly8gRGlzYWJsZSBmaWVsZHNldFxuXHRcdFx0JCgnI2VkaXRGaWVsZHNldCcsIG1vZGFsRWxlbWVudCkuYXR0cignZGlzYWJsZWQnLCAhdmFsdWUpO1xuXG5cdFx0XHQvLyBIaWRlIHNwaW5uZXJcblx0XHRcdGlmICh2YWx1ZSlcblx0XHRcdFx0dGhpcy5zYXZlU3Bpbm5lclZpc2libGUgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRzZXQgYWN0aW9uU3Bpbm5lclZpc2libGUodmFsdWUpXG5cdHtcblx0XHRpZiAodmFsdWUpXG5cdFx0XHQkKCcjYWN0aW9uU3Bpbm5lcicsICQodGhpcykpLnNob3coKTtcblx0XHRlbHNlXG5cdFx0XHQkKCcjYWN0aW9uU3Bpbm5lcicsICQodGhpcykpLmhpZGUoKTtcblx0fVxuXG5cdHNldCBzYXZlU3Bpbm5lclZpc2libGUodmFsdWUpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI2VkaXRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0aWYgKG1vZGFsRWxlbWVudClcblx0XHR7XG5cdFx0XHRpZiAodmFsdWUpXG5cdFx0XHRcdCQoJyNzYXZlU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuc2hvdygpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHQkKCcjc2F2ZVNwaW5uZXInLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHR9XG5cdH1cblxuXHRyZWZyZXNoV29yZHNGaWxlc0xpc3Qod29yZHNGaWxlc0xpc3QsIGhpZGVFZGl0TW9kYWwpXG5cdHtcblx0XHRpZiAoaGlkZUVkaXRNb2RhbClcblx0XHR7XG5cdFx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI2VkaXRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdFx0XHRtb2RhbEVsZW1lbnQubW9kYWwoJ2hpZGUnKTtcblx0XHR9XG5cblx0XHRsZXQgZmlsZXMgPSBbXTtcblx0XHR0aGlzLl9leGlzdGluZ0ZpbGVuYW1lcyA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgZiA9IDA7IGYgPCB3b3Jkc0ZpbGVzTGlzdC5zaXplKCk7IGYrKylcblx0XHR7XG5cdFx0XHRjb25zdCBmaWxlID0gd29yZHNGaWxlc0xpc3QuZ2V0U0ZTT2JqZWN0KGYpO1xuXG5cdFx0XHRjb25zdCBmaWxlT2JqID0ge307XG5cdFx0XHRmaWxlT2JqLm5hbWUgPSBmaWxlLmdldFV0ZlN0cmluZygnbmFtZScpO1xuXHRcdFx0ZmlsZU9iai5kYXRlID0gZmlsZS5nZXRVdGZTdHJpbmcoJ2RhdGUnKSArICcgJyArIGZpbGUuZ2V0VXRmU3RyaW5nKCd0aW1lJyk7XG5cdFx0XHRmaWxlT2JqLnNpemUgPSBieXRlc1RvU2l6ZShmaWxlLmdldExvbmcoJ3NpemUnKSwgMik7XG5cblx0XHRcdC8vIFBvcHVsYXRlIGZpbGVzIGxpc3Rcblx0XHRcdGZpbGVzLnB1c2goZmlsZU9iaik7XG5cblx0XHRcdC8vIFNhdmUgcmVmIHRvIGV4aXN0aW5nIGZpbGVuYW1lcywgdG8gY2hlY2sgdGhlbSB3aGVuIGEgbmV3IGZpbGUgaXMgY3JlYXRlZFxuXHRcdFx0dGhpcy5fZXhpc3RpbmdGaWxlbmFtZXMucHVzaChmaWxlT2JqLm5hbWUpO1xuXHRcdH1cblxuXHRcdC8vIEFzc2lnbiBkYXRhIHNvdXJjZSB0byBncmlkXG5cdFx0dGhpcy5fc2V0V29yZHNGaWxlc0dyaWREYXRhU291cmNlKGZpbGVzKTtcblx0XHR0aGlzLl9vbldvcmRzRmlsZXNHcmlkU2VsZWN0aW9uQ2hhbmdlKCk7XG5cblx0XHQvLyBFbmFibGVcblx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXHR9XG5cblx0Z2V0U2VsZWN0ZWRXb3Jkc0ZpbGVOYW1lKClcblx0e1xuXHRcdGlmICh0aGlzLl93b3Jkc0ZpbGVzR3JpZC5zZWxlY3QoKSAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGxldCBzZWxlY3RlZEluZGV4ID0gdGhpcy5fd29yZHNGaWxlc0dyaWQuc2VsZWN0KCkuaW5kZXgoKTtcblx0XHRcdHJldHVybiB0aGlzLl93b3Jkc0ZpbGVzR3JpZC5kYXRhU291cmNlLmF0KHNlbGVjdGVkSW5kZXgpLm5hbWU7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0ZWRpdFdvcmRzRmlsZShmaWxlbmFtZSwgY29udGVudClcblx0e1xuXHRcdHRoaXMuX2lzTmV3RmlsZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdC8vIFNob3cgbW9kYWxcblx0XHR0aGlzLl9zaG93TW9kYWwoKTtcblxuXHRcdC8vIFJlbW92ZSBkZWZhdWx0IGV4dGVuc2lvbiBmcm9tIGZpbGVuYW1lXG5cdFx0ZmlsZW5hbWUgPSBmaWxlbmFtZS5zdWJzdHJpbmcoMCwgZmlsZW5hbWUubGFzdEluZGV4T2YodGhpcy5XT1JEU19GSUxFX0VYVCkpO1xuXG5cdFx0Ly8gRW50ZXIgY29udGVudCBmaWxlbmFtZSBhbmQgY29udGVudCBpbiBtb2RhbCBmb3JtXG5cdFx0JCgnI2VkaXRNb2RhbCAjZmlsZW5hbWUnLCAkKHRoaXMpKS52YWwoZmlsZW5hbWUpO1xuXHRcdCQoJyNlZGl0TW9kYWwgI2NvbnRlbnQnLCAkKHRoaXMpKS52YWwoY29udGVudCk7XG5cblx0XHQvLyBTZXQgZmlsZW5hbWUgZmllbGQgYXMgbm90IGVkaXRhYmxlIGFuZCBoaWRlIG5vdGVcblx0XHQkKCcjZWRpdE1vZGFsICNmaWxlbmFtZScsICQodGhpcykpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0JCgnI2VkaXRNb2RhbCAjZmlsZW5hbWVOb3RlJywgJCh0aGlzKSkuaGlkZSgpO1xuXHR9XG5cblx0Z2V0RXhpc3RpbmdGaWxlbmFtZXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2V4aXN0aW5nRmlsZW5hbWVzO1xuXHR9XG5cblx0X3NldFdvcmRzRmlsZXNHcmlkRGF0YVNvdXJjZShkcylcblx0e1xuXHRcdC8vIFJlYWQgY3VycmVudCBob3Jpem9udGFsIHNjcm9sbCB2YWx1ZVxuXHQgICBjb25zdCBzY3JvbGxMZWZ0ID0gJCgnI3dvcmRzRmlsZXMgLmstZ3JpZC1jb250ZW50JywgdGhpcy5fd29yZHNGaWxlc0dyaWQud3JhcHBlcikuc2Nyb2xsTGVmdCgpO1xuXG5cdCAgIC8vIEFzc2lnbiBkYXRhIHNvdXJjZSB0byBncmlkXG5cdCAgIHRoaXMuX3dvcmRzRmlsZXNHcmlkLnNldERhdGFTb3VyY2UoZHMpO1xuXG5cdCAgIC8vIFNldCBob3Jpem9udGFsIHNjcm9sbFxuXHQgICAkKCcjd29yZHNGaWxlcyAuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl93b3Jkc0ZpbGVzR3JpZC53cmFwcGVyKS5zY3JvbGxMZWZ0KHNjcm9sbExlZnQpO1xuXHR9XG5cblx0X29uV29yZHNGaWxlc0dyaWRTZWxlY3Rpb25DaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgYnV0dG9uc1xuXHRcdGNvbnN0IHNlbGVjdGVkUm93cyA9IHRoaXMuX3dvcmRzRmlsZXNHcmlkLnNlbGVjdCgpO1xuXHRcdCQoJyNlZGl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBzZWxlY3RlZFJvd3MubGVuZ3RoID09IDApO1xuXHRcdCQoJyNyZW1vdmVCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHNlbGVjdGVkUm93cy5sZW5ndGggPT0gMCk7XG5cdFx0JCgnI2Fzc2lnbkJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgc2VsZWN0ZWRSb3dzLmxlbmd0aCA9PSAwKTtcblx0fVxuXG5cdF9vblJlbG9hZENsaWNrKClcblx0e1xuXHRcdC8vIEZpcmUgZXZlbnQgdG8gcmVxdWVzdCBmaWxlIGNvbnRlbnQgdG8gc2VydmVyXG5cdFx0bGV0IGV2dCA9IG5ldyBDdXN0b21FdmVudCh0aGlzLlJFRlJFU0hfV09SRFNfRklMRVNfQ0xJQ0tfRVZFTlQsIHtcblx0ICAgIFx0ZGV0YWlsOiBudWxsLFxuXHRcdFx0YnViYmxlczogZmFsc2UsXG5cdFx0XHRjYW5jZWxhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdH1cblxuXHRfb25BZGRDbGljaygpXG5cdHtcblx0XHR0aGlzLl9pc05ld0ZpbGUgPSB0cnVlO1xuXG5cdFx0Ly8gU2hvdyBtb2RhbFxuXHRcdHRoaXMuX3Nob3dNb2RhbCgpO1xuXHR9XG5cblx0X29uRWRpdENsaWNrKClcblx0e1xuXHRcdC8vIERpc2FibGUgYnV0dG9uc1xuXHRcdHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXHRcdHRoaXMuYWN0aW9uU3Bpbm5lclZpc2libGUgPSB0cnVlO1xuXG5cdFx0Ly8gRmlyZSBldmVudCB0byByZXF1ZXN0IGZpbGUgY29udGVudCB0byBzZXJ2ZXJcblx0XHRsZXQgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KHRoaXMuRURJVF9XT1JEU19GSUxFX0NMSUNLX0VWRU5ULCB7XG5cdCAgICBcdGRldGFpbDogdGhpcy5nZXRTZWxlY3RlZFdvcmRzRmlsZU5hbWUoKSxcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLFxuXHRcdFx0Y2FuY2VsYWJsZTogZmFsc2Vcblx0XHR9KTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldnQpO1xuXHR9XG5cblx0X29uUmVtb3ZlQ2xpY2soKVxuXHR7XG5cdFx0Ly8gRmlyZSBldmVudCB0byByZXF1ZXN0IGZpbGUgcmVtb3ZhbCB0byBzZXJ2ZXJcblx0XHRsZXQgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KHRoaXMuUkVNT1ZFX1dPUkRTX0ZJTEVfQ0xJQ0tfRVZFTlQsIHtcblx0ICAgIFx0ZGV0YWlsOiB0aGlzLmdldFNlbGVjdGVkV29yZHNGaWxlTmFtZSgpLFxuXHRcdFx0YnViYmxlczogZmFsc2UsXG5cdFx0XHRjYW5jZWxhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdH1cblxuXHRfb25Bc3NpZ25DbGljaygpXG5cdHtcblx0XHQvLyBGaXJlIGV2ZW50IHRvIHN1YnN0aXR1dGUgcGF0aCBpbiBjb25maWd1cmF0aW9uXG5cdFx0bGV0IGV2dCA9IG5ldyBDdXN0b21FdmVudCh0aGlzLkFTU0lHTl9XT1JEU19GSUxFX0NMSUNLX0VWRU5ULCB7XG5cdCAgICBcdGRldGFpbDogdGhpcy5DT05GSUdfRk9MREVSICsgdGhpcy5nZXRTZWxlY3RlZFdvcmRzRmlsZU5hbWUoKSxcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLFxuXHRcdFx0Y2FuY2VsYWJsZTogZmFsc2Vcblx0XHR9KTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldnQpO1xuXHR9XG5cblx0X29uU2F2ZVdvcmRGaWxlQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZSgpKVxuXHRcdHtcblx0XHRcdC8vIFNob3cgc3Bpbm5lclxuXHRcdFx0JCgnI2VkaXRNb2RhbCAjc2F2ZVNwaW5uZXInLCAkKHRoaXMpKS5zaG93KCk7XG5cblx0XHRcdC8vIEZpcmUgZXZlbnQgdG8gcmVxdWVzdCBmaWxlIHRvIGJlIHNhdmVkIGJ5IHNlcnZlclxuXHRcdFx0bGV0IGV2dCA9IG5ldyBDdXN0b21FdmVudCh0aGlzLlNBVkVfV09SRFNfRklMRV9DTElDS19FVkVOVCwge1xuXHRcdCAgICBcdGRldGFpbDoge1xuXHRcdFx0XHRcdGZpbGVuYW1lOiAkKCcjZWRpdE1vZGFsICNmaWxlbmFtZScsICQodGhpcykpLnZhbCgpICsgdGhpcy5XT1JEU19GSUxFX0VYVCxcblx0XHRcdFx0XHRpc05ldzogdGhpcy5faXNOZXdGaWxlLFxuXHRcdFx0XHRcdGNvbnRlbnQ6ICQoJyNlZGl0TW9kYWwgI2NvbnRlbnQnLCAkKHRoaXMpKS52YWwoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRidWJibGVzOiBmYWxzZSxcblx0XHRcdFx0Y2FuY2VsYWJsZTogZmFsc2Vcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0XHR9XG5cdH1cblxuXHRfc2hvd01vZGFsKClcblx0e1xuXHRcdC8vIEFwcGVuZCBtb2RhbCBodG1sXG5cdFx0JCh0aGlzKS5hcHBlbmQodGhpcy5fbW9kYWxIdG1sKTtcblxuXHRcdGxldCBtb2RhbEVsZW1lbnQgPSAkKCcjZWRpdE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHZhbGlkYXRpb25cblx0XHR0aGlzLl92YWxpZGF0b3IgPSBtb2RhbEVsZW1lbnQuZmluZCgnI2VkaXRGaWVsZHNldCcpLmtlbmRvVmFsaWRhdG9yKHtcblx0XHRcdHZhbGlkYXRlT25CbHVyOiB0cnVlLFxuXHRcdFx0cnVsZXM6IHtcblx0XHRcdFx0cmVxdWlyZWRGaWxlbmFtZTogJC5wcm94eShmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbbmFtZT1maWxlbmFtZV0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQudmFsKCkgIT09ICcnO1xuXHRcdFx0XHRcdHJldHVybiB2YWxpZDtcblx0XHRcdFx0fSwgdGhpcyksXG5cdFx0XHRcdHZhbGlkRmlsZW5hbWU6ICQucHJveHkoZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRcdFx0XHRsZXQgdmFsaWQgPSB0cnVlO1xuXHRcdFx0XHRcdGlmIChpbnB1dC5pcygnW25hbWU9ZmlsZW5hbWVdJykpXG5cdFx0XHRcdFx0XHR2YWxpZCA9ICghaW5wdXQudmFsKCkuaW5jbHVkZXMoJ1xcXFwnKSAmJiAhaW5wdXQudmFsKCkuaW5jbHVkZXMoJy8nKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbGlkO1xuXHRcdFx0XHR9LCB0aGlzKVxuXHRcdFx0fSxcblx0XHRcdG1lc3NhZ2VzOiB7XG5cdFx0XHRcdHJlcXVpcmVkRmlsZW5hbWU6ICdSZXF1aXJlZCcsXG5cdFx0XHRcdHZhbGlkRmlsZW5hbWU6ICdDb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgKHNsYXNoLCBiYWNrc2xhc2gpJ1xuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvVmFsaWRhdG9yJyk7XG5cblx0XHQvLyBIaWRlIHNhdmUgc3Bpbm5lclxuXHRcdCQoJyNzYXZlU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIFNhdmUgYnV0dG9uIGNsaWNrXG5cdFx0JCgnI3NhdmVXb3JkRmlsZUJ1dHRvbicsIG1vZGFsRWxlbWVudCkub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblNhdmVXb3JkRmlsZUNsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gbW9kYWwgaGlkZSBldmVudFxuXHRcdG1vZGFsRWxlbWVudC5vbignaGlkZGVuLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLl9kZXN0cm95TW9kYWwsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgYm9vdHN0cmFwIG1vZGFsXG5cdFx0bW9kYWxFbGVtZW50Lm1vZGFsKHtcblx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJyxcblx0XHRcdGtleWJvYXJkOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXG5cdF9kZXN0cm95TW9kYWwoKVxuXHR7XG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyNlZGl0TW9kYWwnLCAkKHRoaXMpKTtcblxuXHRcdGlmIChtb2RhbEVsZW1lbnQpXG5cdFx0e1xuXHRcdFx0Ly8gUmVtb3ZlIGxpc3RlbmVyc1xuXHRcdFx0JCgnI3NhdmVXb3JkRmlsZUJ1dHRvbicsIG1vZGFsRWxlbWVudCkub2ZmKCdjbGljaycpO1xuXHRcdFx0bW9kYWxFbGVtZW50Lm9mZignaGlkZGVuLmJzLm1vZGFsJyk7XG5cblx0XHRcdC8vIERlc3Ryb3kgZXZlcnl0aGluZyBLZW5kb1xuXHRcdFx0a2VuZG8uZGVzdHJveShtb2RhbEVsZW1lbnQpO1xuXG5cdFx0XHQvLyBEaXNwb3NlIG1vZGFsXG5cdFx0XHRtb2RhbEVsZW1lbnQubW9kYWwoJ2Rpc3Bvc2UnKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGh0bWxcblx0XHRcdG1vZGFsRWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdG1vZGFsRWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnd29yZHMtZmlsZXMtbWFuYWdlcicpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd3b3Jkcy1maWxlcy1tYW5hZ2VyJywgV29yZHNGaWxlc01hbmFnZXIpO1xuIiwiZXhwb3J0IGNsYXNzIFNpZGViYXJMYXlvdXQgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHQvLyBBdHRhY2ggYSBzaGFkb3cgcm9vdFxuXHRcdGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG5cdFx0c2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8c3R5bGU+XG5cdFx0XHRcdDpob3N0IHtcblx0XHRcdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0XHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRAbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQteHMpIDo6c2xvdHRlZCg6bm90KFthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSkpIHtcblx0XHRcdFx0XHRcdGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC14cykgOjpzbG90dGVkKFthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSkge1xuXHRcdFx0XHRcdFx0ZmxleC1ncm93OiAxO1xuXHRcdFx0XHQgICAgfVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LXNtKSA6OnNsb3R0ZWQoOm5vdChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pKSB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG5cdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQtc20pIDo6c2xvdHRlZChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pIHtcblx0XHRcdFx0XHRcdGZsZXgtZ3JvdzogMTtcblx0XHRcdFx0ICAgIH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiA5OTEuOThweCkge1xuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1tZCkgOjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LW1kKSA6OnNsb3R0ZWQoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSB7XG5cdFx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdCAgICB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRAbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LWxnKSA6OnNsb3R0ZWQoOm5vdChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pKSB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG5cdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQtbGcpIDo6c2xvdHRlZChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pIHtcblx0XHRcdFx0XHRcdGZsZXgtZ3JvdzogMTtcblx0XHRcdFx0ICAgIH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC5zaWRlLWNvbDo6c2xvdHRlZCgqKSB7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQubWFpbi1jb2w6OnNsb3R0ZWQoKikge1xuXHRcdFx0XHRcdGZsZXgtZ3JvdzogMTtcblx0XHRcdFx0fVxuXHRcdFx0PC9zdHlsZT5cblxuXHRcdFx0PHNsb3QgY2xhc3M9XCJzaWRlLWNvbFwiIG5hbWU9XCJzaWRlLWNvbHVtblwiPjwvc2xvdD5cblx0XHRcdDxzbG90IGNsYXNzPVwibWFpbi1jb2xcIiBuYW1lPVwibWFpbi1jb2x1bW5cIj48L3Nsb3Q+XG5cdFx0YDtcblxuXHRcdC8vIFNldCBpbml0aWFsIHNlbGVjdGlvblxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG5cdH1cblxuXHRnZXQgc2VsZWN0ZWRQYW5lbCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWRQYW5lbDtcblx0fVxuXG5cdHNldCBzZWxlY3RlZFBhbmVsKGVsZW1lbnQpIC8vICdzaWRlJyBvciAnbWFpbidcblx0e1xuXHRcdGlmIChlbGVtZW50ICE9IG51bGwgJiYgZWxlbWVudC5wYXJlbnROb2RlID09IHRoaXMpXG5cdFx0e1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWRQYW5lbCA9IGVsZW1lbnQ7XG5cblx0XHRcdGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5jaGlsZHJlbilcblx0XHRcdHtcblx0XHRcdFx0aWYgKGVsZW1lbnQgPT0gdGhpcy5fc2VsZWN0ZWRQYW5lbClcblx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5lcnJvcignRWxlbWVudCBpcyBub3QgYSBjaGlsZCBvZiBTaWRlYmFyTGF5b3V0Jyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHNlbGVjdGVkSW5kZXgoKVxuXHR7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy5jaGlsZHJlbikuaW5kZXhPZih0aGlzLl9zZWxlY3RlZFBhbmVsKTtcblx0fVxuXG5cdHNldCBzZWxlY3RlZEluZGV4KGluZGV4KVxuXHR7XG5cdFx0aWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMClcblx0XHR7XG5cdFx0XHRpZiAodGhpcy5jaGlsZHJlbltpbmRleF0gPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignSW52YWxpZCBTaWRlYmFyTGF5b3V0IGluZGV4Jyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2luZGV4XTtcblx0XHRcdHRoaXMuc2VsZWN0ZWRQYW5lbCA9IGVsZW1lbnQ7XG5cdFx0fVxuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnc2lkZWJhci1sYXlvdXQnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2lkZWJhci1sYXlvdXQnLCBTaWRlYmFyTGF5b3V0KTtcbiIsImltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSAnLi9iYXNlLW1vZHVsZSc7XG5pbXBvcnQge1ZpZXdTdGFja30gZnJvbSAnLi4vY29tcG9uZW50cy92aWV3LXN0YWNrJztcbmltcG9ydCB7U2lkZWJhckxheW91dH0gZnJvbSAnLi4vY29tcG9uZW50cy9zaWRlYmFyLWxheW91dCc7XG5pbXBvcnQge0NvbmZpZ0ludGVyZmFjZUJ1aWxkZXJ9IGZyb20gJy4uL3V0aWxzL3VpYnVpbGRlci9jb25maWctaW50ZXJmYWNlLWJ1aWxkZXInO1xuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3QsIGZpbHRlckNsYXNzTmFtZX0gZnJvbSAnLi4vdXRpbHMvdXRpbGl0aWVzJztcbmltcG9ydCB7V29yZHNGaWxlc01hbmFnZXJ9IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kdWxlLXNwZWNpZmljL3dvcmRzLWZpbGVzLW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lQ29uZmlndXJhdG9yIGV4dGVuZHMgQmFzZU1vZHVsZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCd6b25lQ29uZmlnJyk7XG5cblx0XHR0aGlzLklURU1fVFlQRV9aT05FID0gJ3pvbmUnO1xuXHRcdHRoaXMuSVRFTV9UWVBFX1JPT00gPSAncm9vbSc7XG5cblx0XHQvLyBPdXRnb2luZyByZXF1ZXN0c1xuXHRcdHRoaXMuUkVRX0dFVF9aT05FUyA9ICdnZXRab25lcyc7XG5cblx0XHR0aGlzLlJFUV9HRVRfWk9ORV9DT05GSUcgPSAnZ2V0Wm9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfU0FWRV9aT05FX0NPTkZJRyA9ICdzYXZlWm9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfTkVXX1pPTkVfQ09ORklHID0gJ25ld1pvbmVDb25maWcnO1xuXHRcdHRoaXMuUkVRX0RFTEVURV9aT05FX0NPTkZJRyA9ICdkZWxab25lQ29uZmlnJztcblx0XHR0aGlzLlJFUV9BQ1RJVkFURV9aT05FID0gJ2FjdFpvbmUnO1xuXG5cdFx0dGhpcy5SRVFfR0VUX1JPT01fQ09ORklHID0gJ2dldFJvb21Db25maWcnO1xuXHRcdHRoaXMuUkVRX1NBVkVfUk9PTV9DT05GSUcgPSAnc2F2ZVJvb21Db25maWcnO1xuXHRcdHRoaXMuUkVRX05FV19ST09NX0NPTkZJRyA9ICduZXdSb29tQ29uZmlnJztcblx0XHR0aGlzLlJFUV9ERUxFVEVfUk9PTV9DT05GSUcgPSAnZGVsUm9vbUNvbmZpZyc7XG5cblx0XHR0aGlzLlJFUV9SRUZSRVNIX1dPUkRTX0ZJTEUgPSAncmVmcmVzaFdvcmRzRmlsZXMnO1xuXHRcdHRoaXMuUkVRX0VESVRfV09SRFNfRklMRSA9ICdlZGl0V29yZHNGaWxlJztcblx0XHR0aGlzLlJFUV9TQVZFX1dPUkRTX0ZJTEUgPSAnc2F2ZVdvcmRzRmlsZSc7XG5cdFx0dGhpcy5SRVFfREVMRVRFX1dPUkRTX0ZJTEUgPSAnZGVsV29yZHNGaWxlJztcblxuXHRcdC8vIEluY29taW5nIHJlc3BvbnNlc1xuXHRcdHRoaXMuUkVTUF9aT05FUyA9ICd6b25lcyc7XG5cblx0XHR0aGlzLlJFU1BfWk9ORV9DT05GSUcgPSAnem9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfQ09ORklHX1VQREFURV9DT05GSVJNID0gJ3pvbmVDZmdVcGQnO1xuXHRcdHRoaXMuUkVTUF9aT05FX0FEREVEID0gJ3pvbmVBZGRlZCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfUkVGVVNFRCA9ICd6b25lUmVmdXNlZCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfREVMRVRFRCA9ICd6b25lRGVsJztcblx0XHR0aGlzLlJFU1BfWk9ORV9BQ1RJVkFURUQgPSAnem9uZUFjdCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfQUNUSVZBVElPTl9FUlJPUiA9ICd6b25lQWN0RXJyJztcblxuXHRcdHRoaXMuUkVTUF9ST09NX0NPTkZJRyA9ICdyb29tQ29uZmlnJztcblx0XHR0aGlzLlJFU1BfUk9PTV9DT05GSUdfVVBEQVRFX0NPTkZJUk0gPSAncm9vbUNmZ1VwZCc7XG5cdFx0dGhpcy5SRVNQX1JPT01fQURERUQgPSAncm9vbUFkZGVkJztcblx0XHR0aGlzLlJFU1BfUk9PTV9SRUZVU0VEID0gJ3Jvb21SZWZ1c2VkJztcblx0XHR0aGlzLlJFU1BfUk9PTV9ERUxFVEVEID0gJ3Jvb21EZWwnO1xuXG5cdFx0dGhpcy5SRVNQX1JFRlJFU0hfV09SRFNfRklMRVMgPSAncmVmcmVzaFdvcmRzRmlsZXMnO1xuXHRcdHRoaXMuUkVTUF9XT1JEU19GSUxFX0NPTlRFTlQgPSAnd29yZHNGaWxlJztcblx0XHR0aGlzLlJFU1BfV09SRFNfRklMRV9FUlJPUiA9ICd3b3Jkc0ZpbGVFcnInO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLyBUaGlzIG1ldGhvZHMgb3ZlcnJpZGUgdGhvc2UgaW4gQmFzZU1vZHVsZSBjbGFzcy5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIENyZWF0ZSBpbnRlcmZhY2UgYnVpbGRlciBpbnN0YW5jZVxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIgPSBuZXcgQ29uZmlnSW50ZXJmYWNlQnVpbGRlcigpO1xuXG5cdFx0Ly8gU2V0IGxpc3RlbmVyIGZvciBjdXN0b20gYWN0aW9ucyB0cmlnZ2VyZWQgYnkgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHQkKCcjem5jLXRhYk5hdmlnYXRvcicpLm9uKCd2YWx1ZS1zZXQnLCAkLnByb3h5KHRoaXMuX29uQ29uZmlnVmFsdWVTZXQsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgWm9uZXMvUm9vbXMgdHJlZXZpZXdcblx0XHR0aGlzLl90cmVldmlldyA9ICQoJyN6bmMtdHJlZVZpZXcnKS5rZW5kb1RyZWVWaWV3KHtcblx0XHRcdGxvYWRPbkRlbWFuZDogZmFsc2UsXG5cdFx0XHRkYXRhVGV4dEZpZWxkOiAnbmFtZScsXG5cdFx0XHR0ZW1wbGF0ZToga2VuZG8udGVtcGxhdGUoJzxzcGFuIGNsYXNzPVwiIyBpZiAoIWl0ZW0uYWN0aXZlKSB7ICMgaW5hY3RpdmUtbGlzdC1pdGVtICMgfSAjXCI+IzogaXRlbS5uYW1lICM8L3NwYW4+JyksXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25ab25lUm9vbUNoYW5nZSwgdGhpcyksXG5cdFx0fSkuZGF0YSgna2VuZG9UcmVlVmlldycpO1xuXG5cdFx0Ly8gTGlzdGVuIHRvIHRyZWV2aWV3IGRvdWJsZS1jbGljayBldmVudFxuXHRcdCQoJyN6bmMtdHJlZVZpZXcnKS5vbignZGJsY2xpY2snLCAkLnByb3h5KHRoaXMuX29uVHJlZUl0ZW1Eb3VibGVDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gUmVxdWVzdCB6b25lcyAmIHJvb21zIGxpc3QgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfWk9ORVMpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBwcm9ncmVzcyBiYXJcblx0XHQkKCcjem5jLXByb2dyZXNzQmFyJykua2VuZG9Qcm9ncmVzc0Jhcih7XG5cdFx0XHRtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcblx0XHRcdHZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byB1dGlsaXR5IGJ1dHRvbnNcblx0XHQkKCcjem5jLWFkZFpvbmVCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQWRkWm9uZUNsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3puYy1hZGRSb29tQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFkZFJvb21DbGljaywgdGhpcykpO1xuXHRcdCQoJyN6bmMtZWRpdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25FZGl0Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLXJlbW92ZUJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SZW1vdmVDbGljaywgdGhpcykpO1xuXHRcdCQoJyN6bmMtYWN0aXZhdGVCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQWN0aXZhdGVDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGludGVyZmFjZSBidXR0b25zXG5cdFx0JCgnI3puYy1jYW5jZWxCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQ2FuY2VsQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLXJlbG9hZEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SZWxvYWRDbGljaywgdGhpcykpO1xuXHRcdCQoJyN6bmMtc3VibWl0QnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblN1Ym1pdENsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBTYXZlIHJlZiB0byB3b3JkcyBmaWxlcyBtYW5hZ2VyIGFuZCBhZGQgY3VzdG9tIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3puYy13b3Jkc0ZpbGVzTWFuYWdlcicpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9uKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLlJFRlJFU0hfV09SRFNfRklMRVNfQ0xJQ0tfRVZFTlQsICQucHJveHkodGhpcy5fb25Xb3Jkc0ZpbGVSZWxvYWRDbGljaywgdGhpcykpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9uKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLkVESVRfV09SRFNfRklMRV9DTElDS19FVkVOVCwgJC5wcm94eSh0aGlzLl9vbldvcmRzRmlsZUVkaXRDbGljaywgdGhpcykpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9uKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLlNBVkVfV09SRFNfRklMRV9DTElDS19FVkVOVCwgJC5wcm94eSh0aGlzLl9vbldvcmRzRmlsZVNhdmVDbGljaywgdGhpcykpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9uKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLlJFTU9WRV9XT1JEU19GSUxFX0NMSUNLX0VWRU5ULCAkLnByb3h5KHRoaXMuX29uV29yZHNGaWxlUmVtb3ZlQ2xpY2ssIHRoaXMpKTtcblx0XHQkKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyKS5vbih0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlci5BU1NJR05fV09SRFNfRklMRV9DTElDS19FVkVOVCwgJC5wcm94eSh0aGlzLl9vbldvcmRzRmlsZUFzc2lnbkNsaWNrLCB0aGlzKSk7XG5cdH1cblxuXHRkZXN0cm95KClcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuZGVzdHJveSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIHRyZWUgdmlldyBkb3VibGVjbGljayBsaXN0ZW5lclxuXHRcdCQoJyN6bmMtdHJlZVZpZXcnKS5vZmYoJ2RibGNsaWNrJyk7XG5cblx0XHQvLyBSZW1vdmUgbGlzdGVuZXIgZm9yIGN1c3RvbSBhY3Rpb25zIHRyaWdnZXJlZCBieSBjb25maWd1cmF0aW9uIGludGVyZmFjZVxuXHRcdCQoJyN6bmMtdGFiTmF2aWdhdG9yJykub2ZmKCd2YWx1ZS1zZXQnKTtcblxuXHRcdC8vIFJlbW92ZSBsaXN0ZW5lciBmb3Igem9uZS9yb29tIGFjdGl2YXRpb24gZXZlbnRcblx0XHQkKCcjem5jLWFkZFpvbmVCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3puYy1hZGRSb29tQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyN6bmMtZWRpdEJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLXJlbW92ZUJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLWFjdGl2YXRlQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gUmVtb3ZlIGludGVyZmFjZSBidXR0b25zIGNsaWNrIGxpc3RlbmVyc1xuXHRcdCQoJyN6bmMtY2FuY2VsQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyN6bmMtcmVsb2FkQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyN6bmMtc3VibWl0QnV0dG9uJykub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVycyB0byB3b3JkcyBmaWxlcyBtYW5hZ2VyXG5cdFx0JCh0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlcikub2ZmKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLlJFRlJFU0hfV09SRFNfRklMRVNfQ0xJQ0tfRVZFTlQpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9mZih0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlci5FRElUX1dPUkRTX0ZJTEVfQ0xJQ0tfRVZFTlQpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9mZih0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlci5TQVZFX1dPUkRTX0ZJTEVfQ0xJQ0tfRVZFTlQpO1xuXHRcdCQodGhpcy5fd29yZHNGaWxlc01hbmFnZXIpLm9mZih0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlci5SRU1PVkVfV09SRFNfRklMRV9DTElDS19FVkVOVCk7XG5cdFx0JCh0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlcikub2ZmKHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLkFTU0lHTl9XT1JEU19GSUxFX0NMSUNLX0VWRU5UKTtcblxuXHRcdC8vIENsZWFyIHRhYnMgY29udGFpbmVyXG5cdFx0dGhpcy5fY2xlYXJUYWJzKCk7XG5cdH1cblxuXHRvbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZCwgZGF0YSlcblx0e1xuXHRcdGNvbnN0IHVzZXJuYW1lID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdC8qKioqKiogWk9ORVMgJiBST09NUyAqKioqKiovXG5cblx0XHQvLyBab25lcyAmIHJvb21zIGxpc3QgcmVjZWl2ZWRcblx0XHRpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORVMpXG5cdFx0XHR0aGlzLl9wb3B1bGF0ZVRyZWUoZGF0YSk7XG5cblx0XHQvLyBab25lIG9yIHJvb20gY29uZmlndXJhdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORV9DT05GSUcgfHwgY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9DT05GSUcpXG5cdFx0e1xuXHRcdFx0Ly8gQnVpbGQgdXNlciBpbnRlcmZhY2UgYmFzZWQgb24gcmVjZWl2ZWQgZGF0YVxuXHRcdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5idWlsZEludGVyZmFjZShkYXRhLmdldFNGU0FycmF5KCdzZXR0aW5ncycpLCAnem5jLXRhYk5hdmlnYXRvcicsIGZhbHNlKTtcblxuXHRcdFx0Ly8gRW5hYmxlIHNjcm9sbGluZyB0YWJzIChpZiBuZWVkZWQpXG5cdFx0XHRpZiAodGhpcy5fcmVpbml0VGFicylcblx0XHRcdHtcblx0XHRcdFx0JCgnI3puYy10YWJOYXZpZ2F0b3IgI3RhYnMnKS5zY3JvbGxpbmdUYWJzKHtcblx0XHRcdFx0XHRib290c3RyYXBWZXJzaW9uOiA0LFxuXHRcdFx0XHRcdHNjcm9sbFRvVGFiRWRnZTogdHJ1ZSxcblx0XHRcdFx0XHRlbmFibGVTd2lwaW5nOiB0cnVlLFxuXHRcdFx0XHRcdGRpc2FibGVTY3JvbGxBcnJvd3NPbkZ1bGx5U2Nyb2xsZWQ6IHRydWUsXG5cdFx0XHRcdFx0Y3NzQ2xhc3NMZWZ0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLWxlZnQnLFxuXHRcdFx0XHRcdGNzc0NsYXNzUmlnaHRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBFbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0LyoqKioqKiBaT05FUyAqKioqKiovXG5cblx0XHQvLyBab25lIGNvbmZpZ3VyYXRpb24gdXBkYXRlIGNvbmZpcm1hdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQ09ORklHX1VQREFURV9DT05GSVJNKVxuXHRcdHtcblx0XHRcdC8vIElmIGEgJ25hbWUnIHBhcmFtZXRlciBpcyByZWNlaXZlZCwgaXQgbWVhbnMgdGhlIHpvbmUgbmFtZSBjaGFuZ2VkLCBhbmQgd2UgaGF2ZSB0byB1cGRhdGUgdGhlIHpvbmVzIGxpc3Rcblx0XHRcdGlmIChkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKSAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl91cGRhdGVab25lTmFtZUluTGlzdChkYXRhLmdldEludCgneklkJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCd6TmFtZScpKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvbjsgb3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgbW9kaWZpZWQnLCBgWm9uZSBzZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseTsgY2hhbmdlcyB3aWxsIGJlIGFwcGxpZWQgb24gbmV4dCA8c3Ryb25nPnNlcnZlciByZXN0YXJ0PC9zdHJvbmc+YCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHpvbmVcblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCd6SWQnKSA9PSB0aGlzLl9lZGl0ZWRab25lSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBtb2RpZmllZCB0aGUgWm9uZSB5b3UgYXJlIGN1cnJlbnRseSBlZGl0aW5nOyBwbGVhc2UgcmVsb2FkIHRvIHVwZGF0ZSB5b3VyIHZpZXcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3pOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgcmVuYW1lZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBjaGFuZ2VkIHRoZSBuYW1lIG9uIG9uZSBvZiB0aGUgWm9uZXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE5ldyB6b25lIGFkZGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORV9BRERFRClcblx0XHR7XG5cdFx0XHRjb25zdCB6b25lTmFtZSA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCd6b25lJykuZ2V0VXRmU3RyaW5nKCduYW1lJyk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgaW50ZXJmYWNlXG5cdFx0XHRcdHRoaXMuX29uQ2FuY2VsQ2xpY2soKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIGFkZGVkJywgYFpvbmUgJyR7em9uZU5hbWV9JyBjcmVhdGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIGFkZGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gY3JlYXRlZCBab25lICcke3pvbmVOYW1lfSdgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG5ldyB6b25lIHRvIHRyZWVcblx0XHRcdGxldCB6b25lc0RTID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZTtcblx0XHRcdHpvbmVzRFMuYWRkKHRoaXMuX2NyZWF0ZVpvbmVPYmplY3QoZGF0YS5nZXRTRlNPYmplY3QoJ3pvbmUnKSkpO1xuXHRcdFx0em9uZXNEUy5zeW5jKCk7XG5cdFx0fVxuXG5cdFx0Ly8gTmV3IHpvbmUgY3JlYXRpb24gcmVmdXNlZCBkdWUgdG8gaW52YWxpZCB6b25lIG5hbWVcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9aT05FX1JFRlVTRUQpXG5cdFx0e1xuXHRcdFx0Ly8gUmUtZW5hYmxlIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHQvLyBTaG93IHdhcm5pbmdcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydCgnWm9uZSBjb25maWd1cmF0aW9uIGNhblxcJ3QgYmUgc2F2ZWQgYmVjYXVzZSBhbm90aGVyIFpvbmUgd2l0aCB0aGUgc2FtZSBuYW1lIGFscmVhZHkgZXhpc3RzLicsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEV4aXN0aW5nIHpvbmUgZGVsZXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfREVMRVRFRClcblx0XHR7XG5cdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSBkZWxldGVyLCByZXNldCB0aGUgaW50ZXJmYWNlOyBvdGhlcndpc2UsIGp1c3Qgc2hvdyBhIG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIHJlbW92ZWQnLCBgWm9uZSAnJHtkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKX0nIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEFuIGFsZXJ0IGJveCBpcyBkaXNwbGF5ZWQgaWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGVkaXRpbmcgdGhlIHNhbWUgem9uZVxuXHRcdFx0XHRpZiAoZGF0YS5nZXRJbnQoJ3pJZCcpID09IHRoaXMuX2VkaXRlZFpvbmVJZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gaGFzIGRlbGV0ZWQgdGhlIFpvbmUgeW91IGFyZSBjdXJyZW50bHkgbW9kaWZ5aW5nOyB5b3UgaGF2ZSB0byBjYW5jZWwgeW91ciBlZGl0aW5nLmApO1xuXG5cdFx0XHRcdFx0Ly8gRGlzYWJsZSBzdWJtaXQgYW5kIHJlbG9hZCBidXR0b25zXG5cdFx0XHRcdFx0JCgnI3puYy1yZWxvYWRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHRcdCQoJyN6bmMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgcmVtb3ZlZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGRlbGV0ZWQgWm9uZSAnJHtkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKX0nYCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzZXQgc2VsZWN0aW9uIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBvciBpdHMgcGFyZW50IGlzIGJlaW5nIHJlbW92ZWRcblx0XHRcdGxldCBzZWxlY3RlZE5vZGUgPSB0aGlzLl90cmVldmlldy5zZWxlY3QoKTtcblx0XHRcdGxldCBzZWxlY3RlZERhdGFJdGVtID0gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0oc2VsZWN0ZWROb2RlKTtcblx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWREYXRhSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUgJiYgc2VsZWN0ZWREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgneklkJykpXG5cdFx0XHRcdFx0dGhpcy5fZGVzZWxlY3RUcmVlSXRlbSgpO1xuXG5cdFx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBwYXJlbnREYXRhSXRlbSA9IHRoaXMuX3RyZWV2aWV3LmRhdGFJdGVtKHRoaXMuX3RyZWV2aWV3LnBhcmVudChzZWxlY3RlZE5vZGUpKTtcblxuXHRcdFx0XHRcdGlmIChwYXJlbnREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgneklkJykpXG5cdFx0XHRcdFx0XHR0aGlzLl9kZXNlbGVjdFRyZWVJdGVtKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIHpvbmUgZnJvbSB0cmVlXG5cdFx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKGRhdGEuZ2V0SW50KCd6SWQnKSk7XG5cdFx0XHRsZXQgem9uZXNEUyA9IHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2U7XG5cdFx0XHR6b25lc0RTLnJlbW92ZShkYXRhSXRlbSk7XG5cdFx0XHR6b25lc0RTLnN5bmMoKTtcblx0XHR9XG5cblx0XHQvLyBab25lIGFjdGl2YXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQUNUSVZBVEVEKVxuXHRcdHtcblx0XHRcdC8vIFNldCB6b25lIGFjdGl2YXRpb24gc3RhdHVzXG5cdFx0XHRjb25zdCB6b25lTmFtZSA9IHRoaXMuX3NldFpvbmVBY3RpdmF0aW9uU3RhdHVzKGRhdGEuZ2V0SW50KCd6SWQnKSwgZGF0YS5nZXRVdGZTdHJpbmcoJ2FjdFJvb21zJyksIHRydWUpO1xuXG5cdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgYWN0aXZhdGVkJywgYFpvbmUgJyR7em9uZU5hbWV9JyBhY3RpdmF0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgYWN0aXZhdGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gYWN0aXZhdGVkIFpvbmUgJyR7em9uZU5hbWV9J2ApO1xuXHRcdH1cblxuXHRcdC8vIFpvbmUgYWN0aXZhdGlvbiBlcnJvclxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQUNUSVZBVElPTl9FUlJPUilcblx0XHR7XG5cdFx0XHQvLyBTZXQgem9uZSBhY3RpdmF0aW9uIHN0YXR1c1xuXHRcdFx0dGhpcy5fc2V0Wm9uZUFjdGl2YXRpb25TdGF0dXMoZGF0YS5nZXRJbnQoJ3pJZCcpLCAnJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyksIHRydWUpO1xuXHRcdH1cblxuXHRcdC8qKioqKiogUk9PTVMgKioqKioqL1xuXG5cdFx0Ly8gUm9vbSBjb25maWd1cmF0aW9uIHVwZGF0ZSBjb25maXJtYXRpb25cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9ST09NX0NPTkZJR19VUERBVEVfQ09ORklSTSlcblx0XHR7XG5cdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3JOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fdXBkYXRlUm9vbU5hbWVJbkxpc3QoZGF0YS5nZXRJbnQoJ3pJZCcpLCBkYXRhLmdldEludCgncklkJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCdyTmFtZScpKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvbjsgb3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gbW9kaWZpZWQnLCBgUm9vbSBzZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseTsgY2hhbmdlcyB3aWxsIGJlIGFwcGxpZWQgb24gbmV4dCA8c3Ryb25nPnNlcnZlciByZXN0YXJ0PC9zdHJvbmc+YCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHJvb21cblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCdySWQnKSA9PSB0aGlzLl9lZGl0ZWRSb29tSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBtb2RpZmllZCB0aGUgUm9vbSB5b3UgYXJlIGN1cnJlbnRseSBlZGl0aW5nOyBwbGVhc2UgcmVsb2FkIHRvIHVwZGF0ZSB5b3VyIHZpZXcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3JOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gcmVuYW1lZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBjaGFuZ2VkIHRoZSBuYW1lIG9uIG9uZSBvZiB0aGUgUm9vbXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE5ldyByb29tIGFkZGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9BRERFRClcblx0XHR7XG5cdFx0XHRjb25zdCByb29tRGF0YSA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCdyb29tJyk7XG5cdFx0XHRjb25zdCB6b25lSWQgPSBkYXRhLmdldEludCgneklkJyk7XG5cblx0XHRcdGxldCB6b25lc0RTID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZTtcblx0XHRcdGxldCB6b25lSXRlbSA9IHpvbmVzRFMuZ2V0KHpvbmVJZCk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgaW50ZXJmYWNlXG5cdFx0XHRcdHRoaXMuX29uQ2FuY2VsQ2xpY2soKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIGFkZGVkJywgYFJvb20gJyR7cm9vbURhdGEuZ2V0VXRmU3RyaW5nKCduYW1lJyl9JyBjcmVhdGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIGFkZGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gY3JlYXRlZCBSb29tICcke3Jvb21EYXRhLmdldFV0ZlN0cmluZygnbmFtZScpfScgaW4gWm9uZSAnJHt6b25lSXRlbS5uYW1lfSdgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG5ldyByb29tIHRvIHRyZWVcblx0XHRcdHpvbmVJdGVtLmFwcGVuZCh0aGlzLl9jcmVhdGVSb29tT2JqZWN0KHJvb21EYXRhLCB6b25lSWQpKTtcblx0XHRcdHpvbmVzRFMuc3luYygpO1xuXG5cdFx0XHQvLyBFeHBhbmQgem9uZSBub2RlIHdoZXJlIHJvb20gd2FzIGFkZGVkXG5cdFx0XHR0aGlzLl90cmVldmlldy5leHBhbmQodGhpcy5fdHJlZXZpZXcuc2VsZWN0KCkpO1xuXHRcdH1cblxuXHRcdC8vIE5ldyByb29tIGNyZWF0aW9uIHJlZnVzZWQgZHVlIHRvIGludmFsaWQgcm9vbSBuYW1lXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9SRUZVU0VEKVxuXHRcdHtcblx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdHRoaXMuX2VuYWJsZUNvbmZpZ0ludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0Ly8gU2hvdyB3YXJuaW5nXG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoJ1Jvb20gY29uZmlndXJhdGlvbiBjYW5cXCd0IGJlIHNhdmVkIGJlY2F1c2UgYW5vdGhlciBSb29tIHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cy4nLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBFeGlzdGluZyByb29tIGRlbGV0ZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9ST09NX0RFTEVURUQpXG5cdFx0e1xuXHRcdFx0bGV0IHpvbmVJdGVtID0gdGhpcy5fZ2V0Wm9uZURhdGFJdGVtQnlJZChkYXRhLmdldEludCgneklkJykpO1xuXHRcdFx0bGV0IHJvb21JdGVtID0gdGhpcy5fZ2V0Um9vbURhdGFJdGVtQnlJZChkYXRhLmdldEludCgneklkJyksIGRhdGEuZ2V0SW50KCdySWQnKSk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIGRlbGV0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmUtZW5hYmxlIGludGVyZmFjZVxuXHRcdFx0XHR0aGlzLl9lbmFibGVMaXN0SW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gcmVtb3ZlZCcsIGBSb29tICcke3Jvb21JdGVtLm5hbWV9JyBkZWxldGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHJvb21cblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCdySWQnKSA9PSB0aGlzLl9lZGl0ZWRSb29tSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBkZWxldGVkIHRoZSBSb29tIHlvdSBhcmUgY3VycmVudGx5IG1vZGlmeWluZzsgeW91IGhhdmUgdG8gY2FuY2VsIHlvdXIgZWRpdGluZy5gKTtcblxuXHRcdFx0XHRcdC8vIERpc2FibGUgc3VibWl0IGFuZCByZWxvYWQgYnV0dG9uc1xuXHRcdFx0XHRcdCQoJyN6bmMtcmVsb2FkQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIHJlbW92ZWQnLCBgQWRtaW5pc3RyYXRvciAke3VzZXJuYW1lfSBkZWxldGVkIFJvb20gJyR7cm9vbUl0ZW0ubmFtZX0nIGZyb20gWm9uZSAnJHt6b25lSXRlbS5uYW1lfSdgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXNldCBzZWxlY3Rpb24gaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtIG9yIGl0cyBwYXJlbnQgaXMgYmVpbmcgcmVtb3ZlZFxuXHRcdFx0bGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuX3RyZWV2aWV3LnNlbGVjdCgpO1xuXHRcdFx0bGV0IHNlbGVjdGVkRGF0YUl0ZW0gPSB0aGlzLl90cmVldmlldy5kYXRhSXRlbShzZWxlY3RlZE5vZGUpO1xuXHRcdFx0aWYgKHNlbGVjdGVkRGF0YUl0ZW0pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSAmJiBzZWxlY3RlZERhdGFJdGVtLmlkID09IGRhdGEuZ2V0SW50KCdySWQnKSlcblx0XHRcdFx0XHR0aGlzLl9kZXNlbGVjdFRyZWVJdGVtKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSByb29tIGZyb20gdHJlZVxuXHRcdFx0em9uZUl0ZW0uY2hpbGRyZW4ucmVtb3ZlKHJvb21JdGVtKTtcblx0XHRcdHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2Uuc3luYygpO1xuXHRcdH1cblxuXHRcdC8qKioqKiogV09SRFMgRklMRVMgKioqKioqL1xuXG5cdFx0Ly8gV29yZHMgZmlsZXMgbGlzdCByZWNlaXZlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JFRlJFU0hfV09SRFNfRklMRVMpXG5cdFx0e1xuXHRcdFx0dGhpcy5fd29yZHNGaWxlc01hbmFnZXIucmVmcmVzaFdvcmRzRmlsZXNMaXN0KGRhdGEuZ2V0U0ZTQXJyYXkoJ3dmJyksIHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpO1xuXG5cdFx0XHQvLyBJZiBhbm90aGVyIHVzZXIgY2F1c2VkIGEgcmVmcmVzaCAoZm9yIGV4YW1wbGUgZGVsZXRpbmcgYSBmaWxlLCBvciBhZGRpbmcgYSBuZXcgb25lKSBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgIT0gbnVsbCAmJiB1c2VybmFtZSAhPSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lICYmIHRoaXMuX2VkaXRlZFpvbmVJZCA+IC0xKVxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdXb3JkcyBmaWxlcyBtb2RpZmllZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBhZGRlZCwgbW9kaWZpZWQgb3IgZGVsZXRlZCBhIHdvcmRzIGZpbGUuYCk7XG5cdFx0fVxuXG5cdFx0Ly8gV29yZHMgZmlsZSBjb250ZW50IHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfV09SRFNfRklMRV9DT05URU5UKVxuXHRcdHtcblx0XHRcdHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLmVkaXRXb3Jkc0ZpbGUoZGF0YS5nZXRVdGZTdHJpbmcoJ2ZpbGVuYW1lJyksIGRhdGEuZ2V0VGV4dCgnY29udGVudCcpKTtcblx0XHR9XG5cblx0XHQvLyBXb3JkcyBmaWxlIGVycm9yIChlZGl0L3NhdmUpXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfV09SRFNfRklMRV9FUlJPUilcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uc1xuXHRcdFx0dGhpcy5fd29yZHNGaWxlc01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChkYXRhLmdldFV0ZlN0cmluZygnZXJyb3InKSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gZWxzZSBpZiAoKVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVUkgRVZFTlQgTElTVEVORVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uVHJlZUl0ZW1Eb3VibGVDbGljayhlKVxuXHR7XG5cdFx0Ly8gR2V0IGV2ZW50IHRhcmdldCdzIGNsb3Nlc3QgdHJlZSBub2RlXG5cdFx0bGV0IHRyZWVOb2RlID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmstaXRlbVtyb2xlPXRyZWVpdGVtXScpO1xuXG5cdFx0Ly8gR2V0IGFzc29jaWF0ZWQgZGF0YSBpdGVtXG5cdFx0bGV0IGRhdGFJdGVtID0gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0odHJlZU5vZGUpO1xuXG5cdFx0Ly8gTG9hZCBjb25maWd1cmF0aW9uXG5cdFx0dGhpcy5fbG9hZENvbmZpZ3VyYXRpb24oZGF0YUl0ZW0udHlwZSk7XG5cdH1cblxuXHRfb25ab25lUm9vbUNoYW5nZSgpXG5cdHtcblx0XHQvLyBSZXNldCB1dGlsaXR5IGJ1dHRvbnNcblx0XHR0aGlzLl9zZXRVdGlsaXR5QnV0dG9uc1N0YXRlKHRoaXMuX3NlbGVjdGVkSXRlbSk7XG5cdH1cblxuXHQvLyBVdGlsaXR5IGJ1dHRvbnMgbGlzdGVuZXJzXG5cblx0X29uQWRkWm9uZUNsaWNrKClcblx0e1xuXHRcdC8vIERlc2VsZWN0IGxpc3QgaXRlbVxuXHRcdHRoaXMuX2Rlc2VsZWN0VHJlZUl0ZW0oKTtcblxuXHRcdC8vIExvYWQgY29uZmlndXJhdGlvblxuXHRcdHRoaXMuX2xvYWRDb25maWd1cmF0aW9uKHRoaXMuSVRFTV9UWVBFX1pPTkUpO1xuXHR9XG5cblx0X29uQWRkUm9vbUNsaWNrKClcblx0e1xuXHRcdC8vIFNlbGVjdCBwYXJlbnQgbGlzdCBpdGVtXG5cdFx0dGhpcy5fc2VsZWN0UGFyZW50VHJlZUl0ZW0oKTtcblxuXHRcdC8vIExvYWQgY29uZmlndXJhdGlvblxuXHRcdHRoaXMuX2xvYWRDb25maWd1cmF0aW9uKHRoaXMuSVRFTV9UWVBFX1JPT00pO1xuXHR9XG5cblx0X29uRWRpdENsaWNrKClcblx0e1xuXHRcdC8vIExvYWQgY29uZmlndXJhdGlvblxuXHRcdHRoaXMuX2xvYWRDb25maWd1cmF0aW9uKHRoaXMuX3NlbGVjdGVkSXRlbS50eXBlKTtcblx0fVxuXG5cdF9vblJlbW92ZUNsaWNrKClcblx0e1xuXHRcdHRoaXMuc2hlbGxDdHJsLnNob3dDb25maXJtV2FybmluZyhgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgc2VsZWN0ZWQgJHt0aGlzLl9zZWxlY3RlZEl0ZW0udHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FID8gJ1pvbmUnIDogJ1Jvb20nfSBjb25maWd1cmF0aW9uP2AsICQucHJveHkodGhpcy5fb25SZW1vdmVDb25maXJtLCB0aGlzKSk7XG5cdH1cblxuXHRfb25SZW1vdmVDb25maXJtKClcblx0e1xuXHRcdC8vIERpc2FibGUgem9uZS9yb29tIHNlbGVjdGlvbiBsaXN0XG5cdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZShmYWxzZSk7XG5cblx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXG5cdFx0Ly8gUmVxdWVzdCB6b25lIHJlbW92YWxcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHR7XG5cdFx0XHRwYXJhbXMucHV0SW50KCd6SWQnLCB0aGlzLl9zZWxlY3RlZEl0ZW0uaWQpO1xuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ERUxFVEVfWk9ORV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRwYXJhbXMucHV0SW50KCd6SWQnLCB0aGlzLl9zZWxlY3RlZEl0ZW1QYXJlbnQuaWQpO1xuXHRcdFx0cGFyYW1zLnB1dEludCgncklkJywgdGhpcy5fc2VsZWN0ZWRJdGVtLmlkKTtcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfREVMRVRFX1JPT01fQ09ORklHLCBwYXJhbXMpO1xuXHRcdH1cblx0fVxuXG5cdF9vbkFjdGl2YXRlQ2xpY2soKVxuXHR7XG5cdFx0Ly8gR2V0IHNlbGVjdGVkIGRhdGEgaXRlbVxuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0udHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FKVxuXHRcdHtcblx0XHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRwYXJhbXMucHV0SW50KCd6SWQnLCB0aGlzLl9zZWxlY3RlZEl0ZW0uaWQpO1xuXG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0FDVElWQVRFX1pPTkUsIHBhcmFtcyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29uZmlndXJhdGlvbiBidXR0b25zIGxpc3RlbmVyc1xuXG5cdF9vbkNhbmNlbENsaWNrKClcblx0e1xuXHRcdC8vIEVuYWJsZSB6b25lL3Jvb20gc2VsZWN0aW9uIGxpc3RzXG5cdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZSh0cnVlKTtcblxuXHRcdC8vIERpc2FibGUgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0Ly8gQ2xlYXIgbWFpbiBjb250YWluZXJcblx0XHR0aGlzLl9yZXNldFRhYnNDb250YWluZXIoZmFsc2UsIHRydWUpO1xuXG5cdFx0Ly8gU2V0IGlzRWRpdGluZyBmbGFnXG5cdFx0dGhpcy5faXNFZGl0aW5nID0gZmFsc2U7XG5cdFx0dGhpcy5fZWRpdGVkSXRlbVR5cGUgPSAnJztcblxuXHRcdC8vIFN3aXRjaCBwYW5lbFxuXHRcdHRoaXMuX3N3aXRjaFBhbmVsKCd6bmMtc2lkZWJhclBhbmVsJyk7XG5cdH1cblxuXHRfb25SZWxvYWRDbGljaygpXG5cdHtcblx0XHQvLyBIaWRlIHZhbGlkYXRpb24gbWVzc2FnZXNcblx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0VmFsaWRhdGlvbigpO1xuXG5cdFx0Ly8gUmVsb2FkIGNvbmZpZ3VyYXRpb25cblx0XHR0aGlzLl9sb2FkQ29uZmlndXJhdGlvbih0aGlzLl9lZGl0ZWRJdGVtVHlwZSwgZmFsc2UpO1xuXHR9XG5cblx0X29uU3VibWl0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gQ2hlY2sgdmFsaWRpdHlcblx0XHRpZiAodGhpcy5faW50ZXJmYWNlQnVpbGRlci5jaGVja0lzVmFsaWQoKSlcblx0XHR7XG5cdFx0XHRsZXQgY2hhbmdlcyA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q2hhbmdlZERhdGEoKTtcblxuXHRcdFx0aWYgKGNoYW5nZXMuc2l6ZSgpID4gMClcblx0XHRcdHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhjaGFuZ2VzLmdldER1bXAoKSlcblxuXHRcdFx0XHQvLyBJbiBjYXNlIHRoZSB6b25lL3Jvb20gbmFtZSBjaGFuZ2VkLCBjaGVjayBpdCBhZ2FpbnN0IHRoZSBsaXN0IChkdXBsaWNhdGUgbmFtZXMgbm90IGFsbG93ZWQhKVxuXHRcdFx0XHRpZiAodGhpcy5fdmFsaWRhdGVOYW1lKGNoYW5nZXMpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzYWJsZSBjb25maWd1cmF0aW9uIGludGVyZmFjZVxuXHRcdFx0XHRcdHRoaXMuX2VuYWJsZUNvbmZpZ0ludGVyZmFjZShmYWxzZSk7XG5cblx0XHRcdFx0XHQvLyBTZW5kIHNldHRpbmdzIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdFx0XHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRcdFx0cGFyYW1zLnB1dFNGU0FycmF5KCdzZXR0aW5ncycsIGNoYW5nZXMpO1xuXHRcdFx0XHRcdHBhcmFtcy5wdXRCb29sKCdiYWNrdXAnLCAkKCcjem5jLWJhY2t1cENoZWNrJykucHJvcCgnY2hlY2tlZCcpKTtcblx0XHRcdFx0XHRwYXJhbXMucHV0SW50KCd6SWQnLCB0aGlzLl9lZGl0ZWRab25lSWQpO1xuXHRcdFx0XHRcdHBhcmFtcy5wdXRJbnQoJ3JJZCcsIHRoaXMuX2VkaXRlZFJvb21JZCk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fZWRpdGVkSXRlbVR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBTdWJtaXQgem9uZSBzZXR0aW5nc1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2VkaXRlZFpvbmVJZCA+IC0xKVxuXHRcdFx0XHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX1NBVkVfWk9ORV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfTkVXX1pPTkVfQ09ORklHLCBwYXJhbXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly8gU3VibWl0IHJvb20gc2V0dGluZ3Ncblx0XHRcdFx0XHRcdGlmICh0aGlzLl9lZGl0ZWRSb29tSWQgPiAtMSlcblx0XHRcdFx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9TQVZFX1JPT01fQ09ORklHLCBwYXJhbXMpO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX05FV19ST09NX0NPTkZJRywgcGFyYW1zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChgVW5hYmxlIHRvIHN1Ym1pdCBjb25maWd1cmF0aW9uIGJlY2F1c2UgdGhlICR7Y2FwaXRhbGl6ZUZpcnN0KHRoaXMuX2VkaXRlZEl0ZW1UeXBlKX0gbmFtZSBhbHJlYWR5IGV4aXN0czsgZHVwbGljYXRlIG5hbWVzIGFyZSBub3QgYWxsb3dlZC5gLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KCdVbmFibGUgdG8gc3VibWl0IGNvbmZpZ3VyYXRpb24gY2hhbmdlcyBkdWUgdG8gYW4gaW52YWxpZCB2YWx1ZTsgcGxlYXNlIHZlcmlmeSB0aGUgaGlnaGxpZ2h0ZWQgZm9ybSBmaWVsZHMgaW4gYWxsIHRhYnMuJywgdHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0X29uQ29uZmlnVmFsdWVTZXQoZSkgLy8gU0FNRSBNRVRIT0QgRFVQTElDQVRFRCBJTiB6b25lLW1vbml0b3IuanNcblx0e1xuXHRcdGNvbnN0IGNvbmZpZ1BhcmFtID0gZS50YXJnZXQuZGF0YTtcblxuXHRcdC8vIEhhbmRsZSBleHRlbnNpb24gbmFtZS90eXBlIGRyb3Bkb3ducyB1cGRhdGUgYW5kIHVwZGF0ZSB0aGUgbWFpbiBjbGFzcyBkcm9wZG93biBkYXRhc291cmNlIGFjY29yZGluZ2x5XG5cdFx0aWYgKGNvbmZpZ1BhcmFtLm5hbWUgPT0gJ2V4dGVuc2lvbi5uYW1lJyB8fCBjb25maWdQYXJhbS5uYW1lID09ICdleHRlbnNpb24udHlwZScgfHwgY29uZmlnUGFyYW0ubmFtZSA9PSAnZXh0ZW5zaW9uLmZpbHRlckNsYXNzJylcblx0XHR7XG5cdFx0XHQvLyBBbGwgaW52b2x2ZWQgQ29uZmlnRm9ybUl0ZW1zIG11c3QgYmUgYXZhaWxhYmxlIGFuZCBpbml0aWFsaXplZCB0byBwcm9jZWVkXG5cdFx0XHRjb25zdCBuYW1lRm9ybUl0ZW0gPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENvbmZpZ0Zvcm1JdGVtKCdleHRlbnNpb24ubmFtZScpO1xuXHRcdFx0Y29uc3QgdHlwZUZvcm1JdGVtID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDb25maWdGb3JtSXRlbSgnZXh0ZW5zaW9uLnR5cGUnKTtcblx0XHRcdGNvbnN0IGNsYXNzRm9ybUl0ZW0gPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENvbmZpZ0Zvcm1JdGVtKCdleHRlbnNpb24uZmlsZScpO1xuXHRcdFx0Y29uc3QgZmlsdGVyRm9ybUl0ZW0gPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENvbmZpZ0Zvcm1JdGVtKCdleHRlbnNpb24uZmlsdGVyQ2xhc3MnKTtcblxuXHRcdFx0aWYgKG5hbWVGb3JtSXRlbSAhPSBudWxsICYmIHR5cGVGb3JtSXRlbSAhPSBudWxsICYmIGNsYXNzRm9ybUl0ZW0gIT0gbnVsbCAmJiBmaWx0ZXJGb3JtSXRlbSAhPSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBzb3VyY2UgPSBuYW1lRm9ybUl0ZW0uZGF0YTtcblx0XHRcdFx0bGV0IGNsYXNzZXNMaXN0ID0gW107XG5cblx0XHRcdFx0bGV0IGRhdGEgPSBzb3VyY2UudHJpZ2dlckRhdGE7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zaXplKCk7IGkrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBleHQgPSBkYXRhLmdldFNGU09iamVjdChpKTtcblxuXHRcdFx0XHRcdGlmIChleHQuZ2V0VXRmU3RyaW5nKCduYW1lJykgPT0gbmFtZUZvcm1JdGVtLmRhdGEudmFsdWUgJiYgZXh0LmdldFV0ZlN0cmluZygndHlwZScpID09IHR5cGVGb3JtSXRlbS5kYXRhLnZhbHVlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxldCBjbGFzc2VzID0gZXh0LmdldFV0ZlN0cmluZygnY2xhc3Nlc1N0cmluZycpLnNwbGl0KCcsJyk7XG5cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJGb3JtSXRlbS5kYXRhLnZhbHVlID09IHRydWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCBmaWx0ZXJlZENsYXNzZXMgPSBjbGFzc2VzLmZpbHRlcihmaWx0ZXJDbGFzc05hbWUpO1xuXHRcdFx0XHRcdFx0XHRjbGFzc2VzID0gZmlsdGVyZWRDbGFzc2VzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjbGFzc2VzTGlzdCA9IGNsYXNzZXNMaXN0LmNvbmNhdChjbGFzc2VzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgY3VycmVudENsYXNzID0gY2xhc3NGb3JtSXRlbS5kYXRhLnZhbHVlO1xuXG5cdFx0XHRcdC8vIElmIHRoZSBjbGFzc2VzIGxpc3QgZG9lc24ndCBjb250YWluIHRoZSBjdXJyZW50IHZhbHVlLCBjcmVhdGUgYW4gZW1wdHkgZW50cnkgYW5kIHJlc2V0IHRoZSB2YWx1ZVxuXHRcdFx0XHRpZiAoY2xhc3Nlc0xpc3QuaW5kZXhPZihjdXJyZW50Q2xhc3MpIDwgMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmIChjbGFzc2VzTGlzdC5sZW5ndGggPT0gMClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjbGFzc2VzTGlzdC5wdXNoKCcnKTtcblx0XHRcdFx0XHRcdGN1cnJlbnRDbGFzcyA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRjdXJyZW50Q2xhc3MgPSBjbGFzc2VzTGlzdFswXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBtYWluQ2xhc3NEcm9wRG93biA9IGNsYXNzRm9ybUl0ZW0uX2lubmVyV2lkZ2V0O1xuXHRcdFx0XHRtYWluQ2xhc3NEcm9wRG93bi5zZXREYXRhU291cmNlKGNsYXNzZXNMaXN0KTtcblxuXHRcdFx0XHRjbGFzc0Zvcm1JdGVtLmRhdGEudmFsdWUgPSBjdXJyZW50Q2xhc3M7XG5cdFx0XHRcdGNsYXNzRm9ybUl0ZW0uX3NldFdpZGdldFZhbHVlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0X29uV29yZHNGaWxlUmVsb2FkQ2xpY2soZXZ0KVxuXHR7XG5cdFx0Ly8gU2VuZCByZXF1ZXN0IHRvIHNlcnZlclxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfUkVGUkVTSF9XT1JEU19GSUxFKTtcblx0fVxuXG5cdF9vbldvcmRzRmlsZUVkaXRDbGljayhldnQpXG5cdHtcblx0XHQvLyBTZW5kIHJlcXVlc3QgdG8gc2VydmVyXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0VXRmU3RyaW5nKCdmaWxlbmFtZScsIGV2dC5kZXRhaWwpO1xuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfRURJVF9XT1JEU19GSUxFLCBwYXJhbXMpO1xuXHR9XG5cblx0X29uV29yZHNGaWxlU2F2ZUNsaWNrKGV2dClcblx0e1xuXHRcdHRoaXMuX3RlbXBXb3Jkc0ZpbGVEYXRhID0gZXZ0LmRldGFpbDtcblxuXHRcdC8vIENoZWNrIGlmIGEgbmV3IGZpbGUgaXMgYmVpbmcgY3JlYXRlZFxuXHRcdGlmICh0aGlzLl90ZW1wV29yZHNGaWxlRGF0YS5pc05ldylcblx0XHR7XG5cdFx0XHQvLyBJZiB5ZXMsIGNoZWNrIGlmIG5hbWUgYWxyZWFkeSBleGlzdHNcblx0XHRcdGlmICh0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlci5nZXRFeGlzdGluZ0ZpbGVuYW1lcygpLmluY2x1ZGVzKHRoaXMuX3RlbXBXb3Jkc0ZpbGVEYXRhLmZpbGVuYW1lKSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gU2hvdyBjb25maXJtIGRpYWxvZ1xuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Q29uZmlybVdhcm5pbmcoJ0Egd29yZHMgZmlsZSB3aXRoIHRoZSBlbnRlcmVkIG5hbWUgYWxyZWFkeSBleGlzdHM7IGRvIHlvdSB3YW50IHRvIHByb2NlZWQgYW55d2F5PyBUaGUgZXhpc3RpbmcgZmlsZSB3aWxsIGJlIG92ZXJ3cml0dGVuLicsICQucHJveHkodGhpcy5fb25Xb3Jkc0ZpbGVTYXZlQ29uZmlybSwgdGhpcykpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VlZFxuXHRcdHRoaXMuX29uV29yZHNGaWxlU2F2ZUNvbmZpcm0oKTtcblx0fVxuXG5cdF9vbldvcmRzRmlsZVNhdmVDb25maXJtKClcblx0e1xuXHRcdC8vIERpc2FibGUgd29yZHMgZmlsZXMgbWFuYWdlciBidXR0b25zXG5cdFx0dGhpcy5fd29yZHNGaWxlc01hbmFnZXIuZW5hYmxlZCA9IGZhbHNlO1xuXHRcdHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLnNhdmVTcGlubmVyVmlzaWJsZSA9IHRydWU7XG5cblx0XHQvLyBTZW5kIHJlcXVlc3QgdG8gc2VydmVyXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0VXRmU3RyaW5nKCdmaWxlbmFtZScsIHRoaXMuX3RlbXBXb3Jkc0ZpbGVEYXRhLmZpbGVuYW1lKTtcblx0XHRwYXJhbXMucHV0VGV4dCgnY29udGVudCcsIHRoaXMuX3RlbXBXb3Jkc0ZpbGVEYXRhLmNvbnRlbnQpO1xuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfU0FWRV9XT1JEU19GSUxFLCBwYXJhbXMpO1xuXHR9XG5cblx0X29uV29yZHNGaWxlUmVtb3ZlQ2xpY2soZXZ0KVxuXHR7XG5cdFx0dGhpcy5zaGVsbEN0cmwuc2hvd0NvbmZpcm1XYXJuaW5nKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBzZWxlY3RlZCB3b3JkcyBmaWxlPycsICQucHJveHkodGhpcy5fb25Xb3Jkc0ZpbGVSZW1vdmVDb25maXJtLCB0aGlzKSk7XG5cdH1cblxuXHRfb25Xb3Jkc0ZpbGVSZW1vdmVDb25maXJtKClcblx0e1xuXHRcdGxldCB3b3Jkc0ZpbGUgPSB0aGlzLl93b3Jkc0ZpbGVzTWFuYWdlci5nZXRTZWxlY3RlZFdvcmRzRmlsZU5hbWUoKTtcblxuXHRcdGlmICh3b3Jkc0ZpbGUgIT0gbnVsbClcblx0XHR7XG5cdFx0XHQvLyBEaXNhYmxlIHdvcmRzIGZpbGVzIG1hbmFnZXIgYnV0dG9uc1xuIFx0XHRcdHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLmVuYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3dvcmRzRmlsZXNNYW5hZ2VyLmFjdGlvblNwaW5uZXJWaXNpYmxlID0gdHJ1ZTtcblxuXHRcdFx0Ly8gU2VuZCByZXF1ZXN0IHRvIHNlcnZlclxuXHRcdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdHBhcmFtcy5wdXRVdGZTdHJpbmcoJ2ZpbGVuYW1lJywgd29yZHNGaWxlKTtcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfREVMRVRFX1dPUkRTX0ZJTEUsIHBhcmFtcyk7XG5cdFx0fVxuXHR9XG5cblx0X29uV29yZHNGaWxlQXNzaWduQ2xpY2soZXZ0KVxuXHR7XG5cdFx0bGV0IHBhdGggPSBldnQuZGV0YWlsO1xuXG5cdFx0Ly8gV3JpdGUgcGF0aCBvZiB0aGUgc2VsZWN0ZWQgd29yZHMgZmlsZSBpbiBcIndvcmRzRmlsdGVyLndvcmRzRmlsZVwiIGR5bmFtaWNhbGx5IGNyZWF0ZWQgZmllbGRcblx0XHRjb25zdCB3b3Jkc0ZpbGVGb3JtSXRlbSA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q29uZmlnRm9ybUl0ZW0oJ3dvcmRzRmlsdGVyLndvcmRzRmlsZScpO1xuXHRcdHdvcmRzRmlsZUZvcm1JdGVtLmRhdGEudmFsdWUgPSBwYXRoO1xuXHRcdHdvcmRzRmlsZUZvcm1JdGVtLl9zZXRXaWRnZXRWYWx1ZSgpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X2VuYWJsZUxpc3RJbnRlcmZhY2UoZW5hYmxlZClcblx0e1xuXHRcdCQoJyN6bmMtdXRpbEJ1dHRvbnMnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjem5jLXRyZWVWaWV3JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdH1cblxuXHRfc2V0VXRpbGl0eUJ1dHRvbnNTdGF0ZShkYXRhSXRlbSA9IG51bGwpXG5cdHtcblx0XHRsZXQgZGlzYWJsZSA9IHRydWU7XG5cblx0XHRpZiAoZGF0YUl0ZW0pXG5cdFx0e1xuXHRcdFx0Ly8gRW5hYmxlICdhY3RpdmF0ZSB6b25lJyBidXR0b24gaWYgem9uZSBpcyBpbmFjdGl2ZVxuXHRcdFx0JCgnI3puYy1hY3RpdmF0ZUJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgKGRhdGFJdGVtLnR5cGUgIT0gdGhpcy5JVEVNX1RZUEVfWk9ORSB8fCBkYXRhSXRlbS5hY3RpdmUpKTtcblxuXHRcdFx0ZGlzYWJsZSA9IGZhbHNlO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gRGlzYWJsZSAnYWN0aXZhdGUgem9uZScgYnV0dG9uXG5cdFx0XHQkKCcjem5jLWFjdGl2YXRlQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSBvdGhlciB1dGlsaXR5IGJ1dHRvbnNcblx0XHQkKCcjem5jLWFkZFpvbmVCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTsgLy8gQWx3YXlzIGVuYWJsZWRcblx0XHQkKCcjem5jLWFkZFJvb21CdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xuXHRcdCQoJyN6bmMtZWRpdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XG5cdFx0JCgnI3puYy1yZW1vdmVCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xuXHR9XG5cblx0X2VuYWJsZUNvbmZpZ0ludGVyZmFjZShlbmFibGVkKVxuXHR7XG5cdFx0JCgnI3puYy1jYW5jZWxCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjem5jLXJlbG9hZEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyN6bmMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdFx0JCgnI3puYy1iYWNrdXBDaGVjaycpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5kaXNhYmxlSW50ZXJmYWNlKCFlbmFibGVkKTtcblxuXHRcdC8vIEFsc28gc3dpdGNoIHZpZXcgd2hlbiBlbmFibGVkXG5cdFx0aWYgKGVuYWJsZWQpXG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCd6bmMtbWFpbicpO1xuXHR9XG5cblx0X3N3aXRjaFZpZXcodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3puYy12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X2NsZWFyVGFicygpXG5cdHtcblx0XHQvLyBEZXN0cm95IHNjcm9sbGluZyB0YWJzXG5cdFx0JCgnI3puYy10YWJOYXZpZ2F0b3IgI3RhYnMnKS5zY3JvbGxpbmdUYWJzKCdkZXN0cm95Jyk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIHRhYiBuYXZpZ2F0b3IgY29udGVudFxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGVzdHJveUludGVyZmFjZSgpO1xuXG5cdFx0Ly8gU2V0IGZsYWcgdG8gcmUtaW5pdGlhbGl6ZSB0YWJzIGlmIG5lZWRlZFxuXHRcdHRoaXMuX3JlaW5pdFRhYnMgPSB0cnVlO1xuXHR9XG5cblx0X3BvcHVsYXRlVHJlZShkYXRhKVxuXHR7XG5cdFx0bGV0IHpEYXRhID0gZGF0YS5nZXRTRlNBcnJheSgnem9uZXMnKTtcblxuXHRcdGxldCB6b25lc0FyciA9IFtdO1xuXHRcdGZvciAobGV0IHogPSAwOyB6IDwgekRhdGEuc2l6ZSgpOyB6KyspXG5cdFx0XHR6b25lc0Fyci5wdXNoKCB0aGlzLl9jcmVhdGVab25lT2JqZWN0KHpEYXRhLmdldFNGU09iamVjdCh6KSkgKTtcblxuXHRcdC8vIENyZWF0ZSBkYXRhc291cmNlXG5cdFx0bGV0IHpvbmVzID0gbmV3IGtlbmRvLmRhdGEuSGllcmFyY2hpY2FsRGF0YVNvdXJjZSh7XG4gICAgICAgICAgICBkYXRhOiB6b25lc0Fycixcblx0XHRcdHNvcnQ6IHtcblx0XHRcdFx0ZmllbGQ6ICduYW1lJyxcblx0XHRcdFx0ZGlyOiAnYXNjJ1xuXHRcdFx0fSxcbiAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG5cdFx0XHRcdFx0aWQ6ICdpZCcsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB7XG5cdFx0XHRcdFx0XHRzY2hlbWE6IHtcblx0XHRcdFx0XHRcdFx0ZGF0YTogJ3Jvb21zJyxcblx0XHRcdFx0XHRcdFx0c29ydDoge1xuXHRcdFx0XHRcdFx0XHRcdGZpZWxkOiAnbmFtZScsXG5cdFx0XHRcdFx0XHRcdFx0ZGlyOiAnYXNjJ1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblx0XHQvLyBTZXQgdHJlZSB2aWV3IGRhdGFwcm92aWRlclxuXHRcdHRoaXMuX3RyZWV2aWV3LnNldERhdGFTb3VyY2Uoem9uZXMpO1xuXG5cdFx0Ly8gU2V0IHV0aWxpdHkgYnV0dG9ucyBzdGF0ZSAoYWRkLCByZW1vdmUsIGVkaXQsIGV0Yylcblx0XHR0aGlzLl9zZXRVdGlsaXR5QnV0dG9uc1N0YXRlKCk7XG5cdH1cblxuXHRfY3JlYXRlWm9uZU9iamVjdCh6b25lRGF0YSlcblx0e1xuXHRcdGxldCB6b25lID0ge1xuXHRcdFx0dHlwZTogdGhpcy5JVEVNX1RZUEVfWk9ORSxcblx0XHRcdG5hbWU6IHpvbmVEYXRhLmdldFV0ZlN0cmluZygnbmFtZScpLFxuXHRcdFx0aWQ6IHpvbmVEYXRhLmdldEludCgnaWQnKSxcblx0XHRcdGFjdGl2ZTogem9uZURhdGEuZ2V0Qm9vbCgnYWN0Jylcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgcm9vbXMgbGlzdCBkYXRhcHJvdmlkZXJcblx0XHRsZXQgckRhdGEgPSB6b25lRGF0YS5nZXRTRlNBcnJheSgncm9vbXMnKTtcblxuXHRcdGxldCByb29tc0FyciA9IFtdO1xuXHRcdGZvciAobGV0IHIgPSAwOyByIDwgckRhdGEuc2l6ZSgpOyByKyspXG5cdFx0XHRyb29tc0Fyci5wdXNoKCB0aGlzLl9jcmVhdGVSb29tT2JqZWN0KHJEYXRhLmdldFNGU09iamVjdChyKSwgem9uZURhdGEuZ2V0SW50KCdpZCcpKSApO1xuXG5cdFx0em9uZS5yb29tcyA9IHJvb21zQXJyO1xuXG5cdFx0cmV0dXJuIHpvbmU7XG5cdH1cblxuXHRfY3JlYXRlUm9vbU9iamVjdChyb29tRGF0YSwgem9uZUlkKVxuXHR7XG5cdFx0bGV0IHJvb20gPSB7XG5cdFx0XHR0eXBlOiB0aGlzLklURU1fVFlQRV9ST09NLFxuXHRcdFx0bmFtZTogcm9vbURhdGEuZ2V0VXRmU3RyaW5nKCduYW1lJyksXG5cdFx0XHRpZDogcm9vbURhdGEuZ2V0SW50KCdpZCcpLFxuXHRcdFx0YWN0aXZlOiByb29tRGF0YS5nZXRCb29sKCdhY3QnKSxcblx0XHRcdHBhcmVudElkOiB6b25lSWQsXG5cdFx0XHRzcHJpdGVDc3NDbGFzczogdGhpcy5fZ2V0Um9vbUxpc3RJY29uQ3NzQ2xhc3Mocm9vbURhdGEuZ2V0Qm9vbCgnYWN0JykpXG5cdFx0fTtcblxuXHRcdHJldHVybiByb29tO1xuXHR9XG5cblx0X2dldFJvb21MaXN0SWNvbkNzc0NsYXNzKGlzQWN0aXZlKVxuXHR7XG5cdFx0cmV0dXJuIGlzQWN0aXZlID8gJ2ZhcyBmYS1kb29yLW9wZW4nIDogJ2ZhcyBmYS1kb29yLWNsb3NlZCBpbmFjdGl2ZS1saXN0LWl0ZW0nO1xuXHR9XG5cblx0X3NldFpvbmVBY3RpdmF0aW9uU3RhdHVzKHpvbmVJZCwgYWN0aXZlUm9vbXMsIGlzQWN0aXZlKVxuXHR7XG5cdFx0bGV0IHpvbmVESSA9IHRoaXMuX2dldFpvbmVEYXRhSXRlbUJ5SWQoem9uZUlkKTtcblxuXHRcdHpvbmVESS5hY3RpdmUgPSBpc0FjdGl2ZTtcblxuXHRcdGxldCBhY3RpdmVSb29tc0FyciA9IGFjdGl2ZVJvb21zLnNwbGl0KCcsJyk7XG5cblx0XHRpZiAoem9uZURJLmhhc0NoaWxkcmVuKVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgem9uZURJLmNoaWxkcmVuLmRhdGEoKS5sZW5ndGg7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJvb20gPSB6b25lREkuY2hpbGRyZW4uZGF0YSgpW2ldO1xuXHRcdFx0XHRyb29tLmFjdGl2ZSA9IChpc0FjdGl2ZSAmJiBhY3RpdmVSb29tc0Fyci5pbmRleE9mKHJvb20ubmFtZSkgPiAtMSk7XG5cdFx0XHRcdHJvb20uc3ByaXRlQ3NzQ2xhc3MgPSB0aGlzLl9nZXRSb29tTGlzdEljb25Dc3NDbGFzcyhyb29tLmFjdGl2ZSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZWZyZXNoIGxpc3Rcblx0XHR0aGlzLl90cmVldmlldy5kYXRhU291cmNlLnN5bmMoKTtcblxuXHRcdC8vIFJldHVybiB6b25lIG5hbWVcblx0XHRyZXR1cm4gem9uZURJLm5hbWU7XG5cdH1cblxuXHRfZGVzZWxlY3RUcmVlSXRlbSgpXG5cdHtcblx0XHR0aGlzLl90cmVldmlldy5zZWxlY3QoJCgpKTtcblx0fVxuXG5cdF9zZWxlY3RQYXJlbnRUcmVlSXRlbSgpXG5cdHtcblx0XHRsZXQgc2VsZWN0ZWROb2RlID0gdGhpcy5fdHJlZXZpZXcuc2VsZWN0KCk7XG5cdFx0bGV0IHNlbGVjdGVkRGF0YUl0ZW0gPSB0aGlzLl90cmVldmlldy5kYXRhSXRlbShzZWxlY3RlZE5vZGUpO1xuXG5cdFx0aWYgKHNlbGVjdGVkRGF0YUl0ZW0udHlwZSA9PSB0aGlzLklURU1fVFlQRV9ST09NKVxuXHRcdHtcblx0XHRcdGxldCBwYXJlbnROb2RlID0gdGhpcy5fdHJlZXZpZXcucGFyZW50KHNlbGVjdGVkTm9kZSk7XG5cdFx0XHR0aGlzLl90cmVldmlldy5zZWxlY3QocGFyZW50Tm9kZSk7XG5cdFx0fVxuXHR9XG5cblx0X2xvYWRDb25maWd1cmF0aW9uKHR5cGUsIHJlc2V0VGFicyA9IHRydWUpXG5cdHtcblx0XHQvLyBEaXNhYmxlIHpvbmUvcm9vbSBzZWxlY3Rpb24gbGlzdFxuXHRcdHRoaXMuX2VuYWJsZUxpc3RJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0Ly8gRGlzYWJsZSBjb25maWd1cmF0aW9uIGludGVyZmFjZVxuXHRcdHRoaXMuX2VuYWJsZUNvbmZpZ0ludGVyZmFjZShmYWxzZSk7XG5cblx0XHQvLyBDbGVhciBtYWluIGNvbnRhaW5lclxuXHRcdHRoaXMuX3Jlc2V0VGFic0NvbnRhaW5lcih0cnVlLCByZXNldFRhYnMpO1xuXG5cdFx0Ly8gU2V0IGlzRWRpdGluZyBmbGFnXG5cdFx0dGhpcy5faXNFZGl0aW5nID0gdHJ1ZTtcblx0XHR0aGlzLl9lZGl0ZWRJdGVtVHlwZSA9IHR5cGU7XG5cblx0XHQvLyBSZXF1ZXN0IHpvbmUgb3Igcm9vbSBjb25maWd1cmF0aW9uIGRhdGEgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0SW50KCd6SWQnLCB0aGlzLl9lZGl0ZWRab25lSWQpO1xuXHRcdHBhcmFtcy5wdXRJbnQoJ3JJZCcsIHRoaXMuX2VkaXRlZFJvb21JZCk7XG5cblx0XHQvLyBJZiBubyByb29tIGlzIHNlbGVjdGVkLCB0aGVuIHdlIGFyZSBlZGl0aW5nIGEgem9uZVxuXHRcdGlmICh0aGlzLl9lZGl0ZWRJdGVtVHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FKVxuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfWk9ORV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfUk9PTV9DT05GSUcsIHBhcmFtcyk7XG5cblx0XHQvLyBTd2l0Y2ggcGFuZWxcblx0XHR0aGlzLl9zd2l0Y2hQYW5lbCgnem5jLW1haW5QYW5lbCcpO1xuXHR9XG5cblx0X3Jlc2V0VGFic0NvbnRhaW5lcihpc0xvYWRpbmcsIHJlc2V0VGFicylcblx0e1xuXHRcdGlmIChyZXNldFRhYnMpXG5cdFx0XHR0aGlzLl9jbGVhclRhYnMoKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9yZWluaXRUYWJzID0gZmFsc2U7XG5cblx0XHRpZiAoIWlzTG9hZGluZylcblx0XHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3puYy1zZWxlY3QnKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCd6bmMtbG9hZGluZycpO1xuXHR9XG5cblx0X3N3aXRjaFBhbmVsKHBhbmVsSWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem5jLXZpZXcnKS5zZWxlY3RlZFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFuZWxJZCk7XG5cdH1cblxuXHRfZ2V0Wm9uZURhdGFJdGVtQnlJZCh6b25lSWQpXG5cdHtcblx0XHRsZXQgem9uZXNEUyA9IHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2U7XG5cdFx0cmV0dXJuIHpvbmVzRFMuZ2V0KHpvbmVJZCk7XG5cdH1cblxuXHRfZ2V0Um9vbURhdGFJdGVtQnlJZCh6b25lSWQsIHJvb21JZClcblx0e1xuXHRcdGxldCB6b25lREkgPSB0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKHpvbmVJZCk7XG5cblx0XHRpZiAoem9uZURJLmhhc0NoaWxkcmVuKVxuXHRcdFx0cmV0dXJuIHpvbmVESS5jaGlsZHJlbi5nZXQocm9vbUlkKTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0X3VwZGF0ZVpvbmVOYW1lSW5MaXN0KHpvbmVJZCwgem9uZU5hbWUpXG5cdHtcblx0XHR0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKHpvbmVJZCkubmFtZSA9IHpvbmVOYW1lO1xuXHRcdHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2Uuc3luYygpO1xuXHR9XG5cblx0X3VwZGF0ZVJvb21OYW1lSW5MaXN0KHpvbmVJZCwgcm9vbUlkLCByb29tTmFtZSlcblx0e1xuXHRcdHRoaXMuX2dldFJvb21EYXRhSXRlbUJ5SWQoem9uZUlkLCByb29tSWQpLm5hbWUgPSByb29tTmFtZTtcblx0XHR0aGlzLl90cmVldmlldy5kYXRhU291cmNlLnN5bmMoKTtcblx0fVxuXG5cdF92YWxpZGF0ZU5hbWUoY2hhbmdlcylcblx0e1xuXHRcdGNvbnN0IHpvbmVJZCA9IHRoaXMuX2VkaXRlZFpvbmVJZDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5zaXplKCk7IGkrKylcblx0XHR7XG5cdFx0XHRjb25zdCBzZXR0aW5nID0gY2hhbmdlcy5nZXRTRlNPYmplY3QoaSk7XG5cblx0XHRcdGlmIChzZXR0aW5nLmNvbnRhaW5zS2V5KCduYW1lJykgJiYgc2V0dGluZy5nZXRVdGZTdHJpbmcoJ25hbWUnKSA9PSAnbmFtZScpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEdldCBuYW1lIHZhbHVlXG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBzZXR0aW5nLmdldFRleHQoJ3ZhbHVlJyk7XG5cblx0XHRcdFx0Ly8gR2V0IGRhdGEgc291cmNlXG5cdFx0XHRcdGxldCBkcyA9IFtdO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9lZGl0ZWRJdGVtVHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FKVxuXHRcdFx0XHRcdGRzID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZS5kYXRhKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICh0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKHpvbmVJZCkuaGFzQ2hpbGRyZW4pXG5cdFx0XHRcdFx0XHRkcyA9IHRoaXMuX2dldFpvbmVEYXRhSXRlbUJ5SWQoem9uZUlkKS5jaGlsZHJlbi5kYXRhKCk7XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdC8vIENoZWNrIGlmIG5hbWUgZXhpc3RzIGluIGRhdGEgc291cmNlXG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgZHMubGVuZ3RoOyBqKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoZHNbal0ubmFtZSA9PSBuYW1lKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgR0VUVEVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGdldCBfc2VsZWN0ZWRJdGVtKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl90cmVldmlldy5kYXRhSXRlbSh0aGlzLl90cmVldmlldy5zZWxlY3QoKSk7XG5cdH1cblxuXHRnZXQgX3NlbGVjdGVkSXRlbVBhcmVudCgpXG5cdHtcblx0XHRsZXQgc2VsZWN0ZWROb2RlID0gdGhpcy5fdHJlZXZpZXcuc2VsZWN0KCk7XG5cdFx0bGV0IHBhcmVudE5vZGUgPSB0aGlzLl90cmVldmlldy5wYXJlbnQoc2VsZWN0ZWROb2RlKTtcblxuXHRcdHJldHVybiB0aGlzLl90cmVldmlldy5kYXRhSXRlbShwYXJlbnROb2RlKTtcblx0fVxuXG5cdGdldCBfZWRpdGVkWm9uZUlkKClcblx0e1xuXHRcdGlmICh0aGlzLl9pc0VkaXRpbmcgJiYgdGhpcy5fc2VsZWN0ZWRJdGVtKVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0udHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtLmlkO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtUGFyZW50LmlkO1xuXHRcdH1cblxuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGdldCBfZWRpdGVkUm9vbUlkKClcblx0e1xuXHRcdGlmICh0aGlzLl9pc0VkaXRpbmcgJiYgdGhpcy5fc2VsZWN0ZWRJdGVtKVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0udHlwZSA9PSB0aGlzLklURU1fVFlQRV9ST09NKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtLmlkO1xuXHRcdH1cblxuXHRcdHJldHVybiAtMTtcblx0fVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNwY0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=