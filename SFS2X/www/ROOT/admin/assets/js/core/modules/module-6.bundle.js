/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-6"],{

/***/ "./src/managers/file-datasource-manager.js":
/*!*************************************************!*\
  !*** ./src/managers/file-datasource-manager.js ***!
  \*************************************************/
/*! exports provided: FileDataSourceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDataSourceManager", function() { return FileDataSourceManager; });
class FileDataSourceManager
{
	constructor(libFolder, protectedFolders, fileSeparator)
	{
		this._protectedFolders = protectedFolders; // Folders which can't be deleted (but their content can)
		this._libFolder = libFolder;
		this._fileSeparator = fileSeparator;
	}

	get dataSource()
	{
		return this._dataSource;
	}

	init()
	{
		this._dataSource = new kendo.data.TreeListDataSource({
			data: [],
			schema: {
				model: {
					id: 'id',
					parentId: 'parentId',
					expanded: false
				}
			},
			sort: { field: 'name', dir: 'asc' }
		});
	}

	addFile(fileObj, parentLevel = null)
	{
		let file = {};

		file.name = fileObj.getUtfString('name');
		file.isDir = fileObj.getBool('isDir');
		file.lastMod = fileObj.getLong('lastMod');
		file.isLib = (file.isDir && file.name == this._libFolder);
		file.isProtected = (file.isDir && this._protectedFolders.indexOf(file.name) > -1);
		file.size = 0;

		if (parentLevel == null)
			file.level = 0;
		else
			file.level = parentLevel + 1;

		if (fileObj.containsKey('parent'))
		{
			file.parentId = fileObj.getUtfString('parent');
			file.id = file.parentId + this._fileSeparator + file.name;
		}
		else
		{
			file.parentId = null;
			file.id = file.name;
		}

		// Add child files
		if (file.isDir)
		{
			let filesArr = fileObj.getSFSArray('files');

			for (let i = 0; i < filesArr.size(); i++)
				file.size += this.addFile(filesArr.getSFSObject(i), file.level);
		}
		else
			file.size = fileObj.getLong('size');

		// Add file to data source
		this._dataSource.add(file);

		// Return file size
		return file.size;
	}

	removeFile(id)
	{
		let fileItem = this._dataSource.get(id);

		if (fileItem)
		{
			if (fileItem.parentId)
			{
				// Subtract old size from parent size
				let parentItem = this._dataSource.get(fileItem.parentId);
				this._updateParentSize(parentItem, -fileItem.size);
			}

			this._dataSource.remove(fileItem);

			// Return parent item
			if (fileItem.parentId)
				return this._dataSource.get(fileItem.parentId);
		}
	}

	getFileById(id)
	{
		return this._dataSource.get(id);
	}

	addFileToParent(fileObj, parentId)
	{
		let parentItem = this._dataSource.get(parentId);

		if (parentItem != null && parentItem.isDir)
		{
			const fileId = parentId + this._fileSeparator + fileObj.getUtfString('name');
			let fileItem = this._dataSource.get(fileId);

			if (fileItem != null)
			{
				// Subtract old size from parent size
				this._updateParentSize(parentItem, -fileItem.size);

				// Update existing item
				fileItem.name = fileObj.getUtfString('name');
				fileItem.lastMod = fileObj.getLong('lastMod');
				fileItem.size = fileObj.getLong('size');
			}
			else
			{
				// Add new item
				this.addFile(fileObj, parentItem.level);
			}

			// Update parent item size
			this._updateParentSize(parentItem, fileObj.getLong('size'));

			return fileId;
		}
		else
			throw new Error(`An unexpected error occurred while adding file '${fileObj.getUtfString('name')}' (target: ${parentId}).`);
	}

	_updateParentSize(parentItem, value)
	{
		parentItem.size += value;

		if (parentItem.parentId)
		{
			let grandParent = this._dataSource.get(parentItem.parentId);
			this._updateParentSize(grandParent, value);
		}
	}
}


/***/ }),

/***/ "./src/modules/extension-manager.js":
/*!******************************************!*\
  !*** ./src/modules/extension-manager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionManager; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _managers_file_datasource_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../managers/file-datasource-manager */ "./src/managers/file-datasource-manager.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");




class ExtensionManager extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('extensionMan');

		// Outgoing requests
		this.REQ_INIT = 'init';
		this.REQ_GET_EXTENSIONS = 'getExtensions';
		this.REQ_CREATE_FOLDER = 'createFolder';
		this.REQ_DELETE_FILES = 'deleteExtFiles';
		this.REQ_RELOAD_EXTENSIONS = 'reloadExt';

		// Incoming responses
		this.RESP_LOCKED = 'lock';
		this.RESP_INIT = 'init';
		this.RESP_EXTENSIONS = 'extensions';
		this.RESP_FILE_ADDED = 'fileAdded';
		this.RESP_FILES_DELETED = 'filesDeleted';
		this.RESP_ERROR = 'error';
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

		// Initialize progress bar
		$('#exm-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Add listeners to buttons
		$('#exm-retryBt').on('click', $.proxy(this._onRetryClick, this));
		$('#exm-refreshBt').on('click', $.proxy(this._onRefreshClick, this));

		// Initialize files list
		this._filesList = $('#exm-fileList').kendoTreeList({
            dataSource: [],
			resizable: true,
			selectable: true,
            columns: [
                {
					field: 'name',
					title: 'Name',
					template: kendo.template(`
						<div >
							# if (isDir) { #
								# if (expanded) { #
									<i class="fas fa-folder-open"></i>
								# } else { #
									<i class="fas fa-folder"></i>
								# } #
							# } else { #
								<i class="far fa-file"></i>
							# } #

							#: name #

						</div>
						<div class="file-controls flex-grow-1 text-right" data-item-id="#:id#">
							# if (isDir) { #
								<button type="button" class="k-button k-primary my-1 create-folder-bt"><i class="fas fa-folder-plus"></i></button>
								# if (level > 0) { #
									<button type="button" class="k-button k-primary my-1 upload-files-bt"><i class="fas fa-file-upload"></i></button>
								# } #
							# } #

							# if (level > 0 && !isProtected) { #
								<button type="button" class="k-button k-primary my-1 remove-file-bt"><i class="fas fa-minus-circle"></i></button>
							# } #

							# if (level == 1 && !isLib) { #
								<button type="button" class="k-button k-primary my-1 reload-ext-bt"><i class="fas fa-redo-alt"></i></button>
							# } #
						</div>
					`),
				},
                {
					field: 'size',
					title: 'Size',
					template: function(dataItem) {
						dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_2__["bytesToSize"]; // Pass bytesToSize utility function to template
						return kendo.template(`
							#: bytesToSize(size, 2, 'KB') #
						`)(dataItem);
					},
					width: 120,
					minScreenWidth: 576
				},
                {
					field: 'lastMod',
					title: 'Last Modified',
					template: kendo.template(`
						#: kendo.toString(new Date(lastMod), 'dd MMM yyyy HH:mm:ss') #
					`),
					width: 200,
					minScreenWidth: 768
				},
            ],
			change: $.proxy(this._onFileSelectedChange, this)
        }).data('kendoTreeList');

		//-------------------------------------------

		// Add listeners to catch control button clicks on rows
		$('#exm-fileList').on('click', '.create-folder-bt', $.proxy(this._showAddFolderModalClick, this));
		$('#exm-fileList').on('click', '.upload-files-bt', $.proxy(this._showUploadFilesModalClick, this));
		$('#exm-fileList').on('click', '.remove-file-bt', $.proxy(this._onRemoveFileClick, this));
		$('#exm-fileList').on('click', '.reload-ext-bt', $.proxy(this._onReloadExtClick, this));

		//-------------------------------------------

		// Initialize "add folder" modal
		this._addFolderModal = $('#exm-addFolderModal');
		this._addFolderModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Add listener to modal hide event
		this._addFolderModal.on('hidden.bs.modal', $.proxy(this._onAddFolderModalHidden, this));

		// Add listener to Add button click
		$('#exm-addFolderBt').on('click', $.proxy(this._onAddFolderClick, this));

		// Initialize kendo validation on folder name form
		this._addFolderValidator = $('#exm-addFolderForm').kendoValidator({}).data('kendoValidator');

		//-------------------------------------------

		// Initialize "upload files" modal
		this._uploadFilesModal = $('#exm-uploadModal');
		this._uploadFilesModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Initialize kendo uploader
		this._uploader = $('#exm-uploader').kendoUpload({
			multiple: true,
			async: {
				saveUrl: 'http://localhost', // This will be changed later in _onUploadStart method
				autoUpload: true,
			},
			directoryDrop: true,
			upload: $.proxy(this._onUploadStart, this),
			complete: $.proxy(this._onUploadEnd, this),
			localization: {
				select: 'Select files...'
			}
		}).data('kendoUpload');

		// Add listener to Upload button click
		$('#exm-clearFilesBt').on('click', $.proxy(this._onClearFilesClick, this));

		//-------------------------------------------

		// Send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#exm-retryBt').off('click');
		$('#exm-refreshBt').off('click');

		$('#exm-fileList').off('click');

		this._addFolderModal.off('hidden.bs.modal');
		this._addFolderModal.modal('dispose');
		$('#exm-addFolderBt').off('click');

		this._uploadFilesModal.modal('dispose');
		$('#exm-clearFilesBt').off('click');
	}

	onExtensionCommand(command, data)
	{
		// Module can be enabled (no locking file exists)
		if (command == this.RESP_INIT)
		{
			// Retrieve file separator
			this._fileSeparator = data.getUtfString('sep');

			// Retrieve Extensions' __lib__ folder name
			const libFolder = data.getUtfString('lib');

			// Create file data source manager
			this._fileManager = new _managers_file_datasource_manager__WEBPACK_IMPORTED_MODULE_1__["FileDataSourceManager"](libFolder, [libFolder], this._fileSeparator);

			// Retrieve module id sent by the server (required because multiple modules use file uploading service)
			const uploadModuleId = data.getUtfString('modId');

			// Set file uploading target configuration
			this._uploadTargetConfig = {
				sessionToken: this.smartFox.sessionToken,
				host: this.smartFox.config.host,
				port: this.smartFox.config.port,
				moduleId: uploadModuleId,
				protocol: this.smartFox.config.useSSL ? 'https' : 'http'
			};

			// Request Extension files data to server instance
			this._refreshDataList();
		}

		/*
		 * This response is returned if the file UploadsLock.txt exists in the /config folder of the server.
		 * This is an additional security measure to avoid unwanted files to be uploaded by malicius users accessing the server
		 * with the default credentials, in case they have not been changed by the administrator after the installation.
		 * The file must be removed manually before accessing the Extension Manager module for the first time
		 */
		else if (command == this.RESP_LOCKED)
		{
			// Show warning
			this._switchView('exm-locked');
		}

		// Extensions folders and files
		else if (command == this.RESP_EXTENSIONS)
		{
			// Retrieve Extension file list
			let extensionsObj = data.getSFSObject('extensions');

			// Initialize manager
			this._fileManager.init();

			// Add list to manager
			this._fileManager.addFile(extensionsObj);

			// Set TreeList data source
			this._filesList.setDataSource(this._fileManager.dataSource);

			// Expand first level
			this._filesList.expand($('#exm-fileList tbody>tr:eq(0)'));

			// Enable interface
			this._enableInterface(true);

			// Show module's main view
			this._switchView('exm-main');
		}

		// An error occurred while managing extension files
		else if (command == this.RESP_ERROR)
		{
			// Hide add folder modal
			this._addFolderModal.modal('hide');

			// Re-enable interface
			this._enableInterface(true);

			// Show an alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'));
		}

		// Extension folder or file added
		else if (command == this.RESP_FILE_ADDED)
		{
			// Get name of the user who added the file/folder
			const requester = data.getUtfString('user');

			// Get the object representing the file/folder being added
			const fileObj = data.getSFSObject('file');

			// Get the target folder where the new file/folder should be added
			const parentPath = data.getUtfString('parent');

			// Get the flag notifying this was a file upload
			const isUpload = data.getBool('isUpload');

			try
			{
				// Add/update item on data source
				const filePath = this._fileManager.addFileToParent(fileObj, parentPath);

				// Refresh view
				this._filesList.refresh();

				if (requester == this.smartFox.mySelf.name)
				{
					// Expand parent
					this._filesList.expand($(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(parentPath)}"]`).closest('tr'));

					if (!isUpload)
					{
						// Hide modal
						this._addFolderModal.modal('hide');

						// Select upload file
						this._filesList.select($(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(filePath)}"]`).closest('tr'));
					}

					// Update selection
					this._onFileSelectedChange();
				}
				else
				{
					// Display notification
					if (!isUpload)
						this.shellCtrl.showNotification(`Folder created`, `Administrator ${requester} created folder: <strong>${filePath}</strong>`);
					else
						this.shellCtrl.showNotification(`File uploaded`, `Administrator ${requester} uploaded file: <strong>${filePath}</strong>`);
				}
			}
			catch (e)
			{
				// This should not happen... data source is corrupted?
				if (requester == this.smartFox.mySelf.name)
					this.shellCtrl.showSimpleAlert(e.message, true);
			}

			// Enable interface
			this._enableInterface(true);
		}

		// Extension files deleted
		else if (command == this.RESP_FILES_DELETED)
		{
			// Get name of the user who deleted the file/s
			const requester = data.getUtfString('user');

			// Get the list of deleted files
			let files = data.getSFSArray('files');

			let filesArr = [];

			// Update data source
			for (let j = 0; j < files.size(); j++)
			{
				let path = files.getUtfString(j);
				filesArr.push(path);

				//------------------------

				// Remove item from data source; parent item is returned
				let parentItem = this._fileManager.removeFile(path);

				// Collapse parent if the last of its children was deleted
				if (parentItem && !parentItem.hasChildren)
					this._filesList.collapse($(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(parentItem.id)}"]`).closest('tr'));
			}

			if (requester == this.smartFox.mySelf.name)
			{
				// Display notification
				this.shellCtrl.showNotification(`${this._selectedItem.isDir ? 'Folder' : 'File'} deleted`, `${this._selectedItem.isDir ? 'Folder' : 'File'} '${this._selectedItem.name}' deleted successfully`);

				this._selectedItem = null;

				this._enableInterface(true);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification(`File deleted`, `Administrator ${requester} deleted the following file${filesArr.length > 1 ? 's' : ''}: <strong>${filesArr.join('<br> ')}</strong>`);
			}

			// Reset selection
			this._onFileSelectedChange();
		}

		// else if ()
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onRetryClick()
	{
		this._switchView('exm-init');

		// Re-send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	_onRefreshClick()
	{
		this._filesList.clearSelection();
		this._refreshDataList();
	}

	_onFileSelectedChange()
	{
		// Hide control buttons on currently selected item
		if (this._selectedItem)
			$(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(this._selectedItem.id)}"]`).hide();

		// Get selected item
		let selectedRows = this._filesList.select();

		if (selectedRows.length > 0)
		{
			// Save ref. to selected item
			this._selectedItem = this._filesList.dataItem(selectedRows[0]);

			// Show control buttons on new selected item
			$(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(this._selectedItem.id)}"]`).show();
		}
		else
			this._selectedItem = null;
	}

	_showAddFolderModalClick()
	{
		if (this._selectedItem && this._selectedItem.isDir)
		{
			this._addFolderModal.modal('show');
			$('#exm-folderNameIn').focus();
		}
	}

	_onAddFolderClick()
	{
		// The parent folder could have been deleted while user is still typing the name of the new child folder
		if (!this._selectedItem)
		{
			this._addFolderModal.modal('hide');
			this.shellCtrl.showSimpleAlert('Unable to create folder; the parent folder doesn\'t exist.');
			return;
		}

		if (this._addFolderValidator.validate())
		{
			// Disable modal interface
			this._enableAddFolderModal(false);

			let data = new SFS2X.SFSObject();
			data.putUtfString('folder', this._selectedItem.id + this._fileSeparator + $('#exm-folderNameIn').val());

			// Send request to server
			this.sendExtensionRequest(this.REQ_CREATE_FOLDER, data);
		}
	}

	_onAddFolderModalHidden()
	{
		$('#exm-folderNameIn').val('');
		this._resetAddFolderValidation();

		// Enable modal interface
		this._enableAddFolderModal(true);
	}

	_showUploadFilesModalClick()
	{
		if (this._selectedItem)
			this._uploadFilesModal.modal('show');
	}

	_onClearFilesClick()
	{
		this._uploader.clearAllFiles();
	}

	_onUploadStart(e)
	{
		// Disable clear button
		$('#exm-clearFilesBt').attr('disabled', true);

		// Set destination url
		const url = this._uploadTargetConfig.protocol + '://' + this._uploadTargetConfig.host + ':' + this._uploadTargetConfig.port + '/BlueBox/SFS2XFileUpload?sessHashId=' + this._uploadTargetConfig.sessionToken;
		
		e.sender.options.async.saveUrl = url;

		// Set payload
		const params = new FormData();
		params.append('__module', this._uploadTargetConfig.moduleId);
		params.append('__target', this._selectedItem.id);

		for (let f = 0; f < e.files.length; f++)
			params.append('files[]', e.files[f].rawFile);

		e.formData = params;
	}

	_onUploadEnd(e)
	{
		// Enable clear button
		$('#exm-clearFilesBt').attr('disabled', false);
	}

	_onFilesUploadEnd(response)
	{
		// Nothing to do: we have to wait the upload process completion to be signaled by the server through the dedicated Extension response

		//=================================================================

		// TODO Should we handle this response in some way? For some unknown reason we always get ok=false and status=0
		// console.log(response)
		// console.log(response.ok)
		// console.log(response.status)
	}

	_onRemoveFileClick()
	{
		if (this._selectedItem)
			this.shellCtrl.showConfirmWarning(`Are you sure you want to delete the selected ${this._selectedItem.isDir ? 'folder' : 'file'}?<br><br>Path: <strong>${this._selectedItem.id}</strong>`, $.proxy(this._onRemoveFileConfirm, this));
	}

	_onRemoveFileConfirm()
	{
		// Disable interface
		this._enableInterface(false);

		// Request Extension files removal
		// NOTE: for compatibility with older AdminTool, the file to be deleted is sent
		// in an array of strings, even if we can't delete more than 1 file at once in this AdminTool

		let files = new SFS2X.SFSArray();
		files.addUtfString(this._selectedItem.id);

		let params = new SFS2X.SFSObject();
		params.putSFSArray('files', files);

		this.sendExtensionRequest(this.REQ_DELETE_FILES, params);
	}

	_onReloadExtClick()
	{
		if (this._selectedItem)
		{
			let pathArr = this._selectedItem.id.split(this._fileSeparator);

			if (pathArr.length > 1)
			{
				// Request Extension reload
				// NOTE: for compatibility with older AdminTool, the Extension to be reloaded is sent
				// in an array of strings, even if we can't reload more than 1 Extension at once in this AdminTool

				let extToReload = [];
				extToReload.push(pathArr[1]);

				let params = new SFS2X.SFSObject();
				params.putUtfStringArray('extensions', extToReload);

				// Send request to server
				this.sendExtensionRequest(this.REQ_RELOAD_EXTENSIONS, params);
			}
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_switchView(viewId)
	{
		document.getElementById('exm-viewstack').selectedElement = document.getElementById(viewId);
	}

	_enableInterface(enable)
	{
		$('#exm-fileList').attr('disabled', !enable);
		$('#exm-refreshBt').attr('disabled', !enable);
	}

	_refreshDataList()
	{
		// Disable interface
		this._enableInterface(false);

		// Send request to server
		this.sendExtensionRequest(this.REQ_GET_EXTENSIONS)
	}

	_resetAddFolderValidation()
	{
		this._addFolderValidator.hideMessages();

		// The method above doesn't remove the k-invalid classes and aria-invalid="true" attributes from inputs
		// Let's do it manually
		$('#exm-addFolderForm .k-invalid').removeClass('k-invalid');
		$('#exm-addFolderForm [aria-invalid="true"]').removeAttr('aria-invalid');
	}

	_enableAddFolderModal(enable)
	{
		// Disable modal close buttons
		$('#exm-addFolderModal button[data-dismiss="modal"]').attr('disabled', !enable);

		// Disable add button
		$('#exm-addFolderBt').attr('disabled', !enable);

		// Disable fieldset
		$('#exm-addFolderForm').attr('disabled', !enable);
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtNi5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tYW5hZ2Vycy9maWxlLWRhdGFzb3VyY2UtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL2V4dGVuc2lvbi1tYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGaWxlRGF0YVNvdXJjZU1hbmFnZXJcbntcblx0Y29uc3RydWN0b3IobGliRm9sZGVyLCBwcm90ZWN0ZWRGb2xkZXJzLCBmaWxlU2VwYXJhdG9yKVxuXHR7XG5cdFx0dGhpcy5fcHJvdGVjdGVkRm9sZGVycyA9IHByb3RlY3RlZEZvbGRlcnM7IC8vIEZvbGRlcnMgd2hpY2ggY2FuJ3QgYmUgZGVsZXRlZCAoYnV0IHRoZWlyIGNvbnRlbnQgY2FuKVxuXHRcdHRoaXMuX2xpYkZvbGRlciA9IGxpYkZvbGRlcjtcblx0XHR0aGlzLl9maWxlU2VwYXJhdG9yID0gZmlsZVNlcGFyYXRvcjtcblx0fVxuXG5cdGdldCBkYXRhU291cmNlKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuXHR9XG5cblx0aW5pdCgpXG5cdHtcblx0XHR0aGlzLl9kYXRhU291cmNlID0gbmV3IGtlbmRvLmRhdGEuVHJlZUxpc3REYXRhU291cmNlKHtcblx0XHRcdGRhdGE6IFtdLFxuXHRcdFx0c2NoZW1hOiB7XG5cdFx0XHRcdG1vZGVsOiB7XG5cdFx0XHRcdFx0aWQ6ICdpZCcsXG5cdFx0XHRcdFx0cGFyZW50SWQ6ICdwYXJlbnRJZCcsXG5cdFx0XHRcdFx0ZXhwYW5kZWQ6IGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzb3J0OiB7IGZpZWxkOiAnbmFtZScsIGRpcjogJ2FzYycgfVxuXHRcdH0pO1xuXHR9XG5cblx0YWRkRmlsZShmaWxlT2JqLCBwYXJlbnRMZXZlbCA9IG51bGwpXG5cdHtcblx0XHRsZXQgZmlsZSA9IHt9O1xuXG5cdFx0ZmlsZS5uYW1lID0gZmlsZU9iai5nZXRVdGZTdHJpbmcoJ25hbWUnKTtcblx0XHRmaWxlLmlzRGlyID0gZmlsZU9iai5nZXRCb29sKCdpc0RpcicpO1xuXHRcdGZpbGUubGFzdE1vZCA9IGZpbGVPYmouZ2V0TG9uZygnbGFzdE1vZCcpO1xuXHRcdGZpbGUuaXNMaWIgPSAoZmlsZS5pc0RpciAmJiBmaWxlLm5hbWUgPT0gdGhpcy5fbGliRm9sZGVyKTtcblx0XHRmaWxlLmlzUHJvdGVjdGVkID0gKGZpbGUuaXNEaXIgJiYgdGhpcy5fcHJvdGVjdGVkRm9sZGVycy5pbmRleE9mKGZpbGUubmFtZSkgPiAtMSk7XG5cdFx0ZmlsZS5zaXplID0gMDtcblxuXHRcdGlmIChwYXJlbnRMZXZlbCA9PSBudWxsKVxuXHRcdFx0ZmlsZS5sZXZlbCA9IDA7XG5cdFx0ZWxzZVxuXHRcdFx0ZmlsZS5sZXZlbCA9IHBhcmVudExldmVsICsgMTtcblxuXHRcdGlmIChmaWxlT2JqLmNvbnRhaW5zS2V5KCdwYXJlbnQnKSlcblx0XHR7XG5cdFx0XHRmaWxlLnBhcmVudElkID0gZmlsZU9iai5nZXRVdGZTdHJpbmcoJ3BhcmVudCcpO1xuXHRcdFx0ZmlsZS5pZCA9IGZpbGUucGFyZW50SWQgKyB0aGlzLl9maWxlU2VwYXJhdG9yICsgZmlsZS5uYW1lO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZmlsZS5wYXJlbnRJZCA9IG51bGw7XG5cdFx0XHRmaWxlLmlkID0gZmlsZS5uYW1lO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBjaGlsZCBmaWxlc1xuXHRcdGlmIChmaWxlLmlzRGlyKVxuXHRcdHtcblx0XHRcdGxldCBmaWxlc0FyciA9IGZpbGVPYmouZ2V0U0ZTQXJyYXkoJ2ZpbGVzJyk7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXNBcnIuc2l6ZSgpOyBpKyspXG5cdFx0XHRcdGZpbGUuc2l6ZSArPSB0aGlzLmFkZEZpbGUoZmlsZXNBcnIuZ2V0U0ZTT2JqZWN0KGkpLCBmaWxlLmxldmVsKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0ZmlsZS5zaXplID0gZmlsZU9iai5nZXRMb25nKCdzaXplJyk7XG5cblx0XHQvLyBBZGQgZmlsZSB0byBkYXRhIHNvdXJjZVxuXHRcdHRoaXMuX2RhdGFTb3VyY2UuYWRkKGZpbGUpO1xuXG5cdFx0Ly8gUmV0dXJuIGZpbGUgc2l6ZVxuXHRcdHJldHVybiBmaWxlLnNpemU7XG5cdH1cblxuXHRyZW1vdmVGaWxlKGlkKVxuXHR7XG5cdFx0bGV0IGZpbGVJdGVtID0gdGhpcy5fZGF0YVNvdXJjZS5nZXQoaWQpO1xuXG5cdFx0aWYgKGZpbGVJdGVtKVxuXHRcdHtcblx0XHRcdGlmIChmaWxlSXRlbS5wYXJlbnRJZClcblx0XHRcdHtcblx0XHRcdFx0Ly8gU3VidHJhY3Qgb2xkIHNpemUgZnJvbSBwYXJlbnQgc2l6ZVxuXHRcdFx0XHRsZXQgcGFyZW50SXRlbSA9IHRoaXMuX2RhdGFTb3VyY2UuZ2V0KGZpbGVJdGVtLnBhcmVudElkKTtcblx0XHRcdFx0dGhpcy5fdXBkYXRlUGFyZW50U2l6ZShwYXJlbnRJdGVtLCAtZmlsZUl0ZW0uc2l6ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2RhdGFTb3VyY2UucmVtb3ZlKGZpbGVJdGVtKTtcblxuXHRcdFx0Ly8gUmV0dXJuIHBhcmVudCBpdGVtXG5cdFx0XHRpZiAoZmlsZUl0ZW0ucGFyZW50SWQpXG5cdFx0XHRcdHJldHVybiB0aGlzLl9kYXRhU291cmNlLmdldChmaWxlSXRlbS5wYXJlbnRJZCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmlsZUJ5SWQoaWQpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5nZXQoaWQpO1xuXHR9XG5cblx0YWRkRmlsZVRvUGFyZW50KGZpbGVPYmosIHBhcmVudElkKVxuXHR7XG5cdFx0bGV0IHBhcmVudEl0ZW0gPSB0aGlzLl9kYXRhU291cmNlLmdldChwYXJlbnRJZCk7XG5cblx0XHRpZiAocGFyZW50SXRlbSAhPSBudWxsICYmIHBhcmVudEl0ZW0uaXNEaXIpXG5cdFx0e1xuXHRcdFx0Y29uc3QgZmlsZUlkID0gcGFyZW50SWQgKyB0aGlzLl9maWxlU2VwYXJhdG9yICsgZmlsZU9iai5nZXRVdGZTdHJpbmcoJ25hbWUnKTtcblx0XHRcdGxldCBmaWxlSXRlbSA9IHRoaXMuX2RhdGFTb3VyY2UuZ2V0KGZpbGVJZCk7XG5cblx0XHRcdGlmIChmaWxlSXRlbSAhPSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBTdWJ0cmFjdCBvbGQgc2l6ZSBmcm9tIHBhcmVudCBzaXplXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVBhcmVudFNpemUocGFyZW50SXRlbSwgLWZpbGVJdGVtLnNpemUpO1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSBleGlzdGluZyBpdGVtXG5cdFx0XHRcdGZpbGVJdGVtLm5hbWUgPSBmaWxlT2JqLmdldFV0ZlN0cmluZygnbmFtZScpO1xuXHRcdFx0XHRmaWxlSXRlbS5sYXN0TW9kID0gZmlsZU9iai5nZXRMb25nKCdsYXN0TW9kJyk7XG5cdFx0XHRcdGZpbGVJdGVtLnNpemUgPSBmaWxlT2JqLmdldExvbmcoJ3NpemUnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gQWRkIG5ldyBpdGVtXG5cdFx0XHRcdHRoaXMuYWRkRmlsZShmaWxlT2JqLCBwYXJlbnRJdGVtLmxldmVsKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIHBhcmVudCBpdGVtIHNpemVcblx0XHRcdHRoaXMuX3VwZGF0ZVBhcmVudFNpemUocGFyZW50SXRlbSwgZmlsZU9iai5nZXRMb25nKCdzaXplJykpO1xuXG5cdFx0XHRyZXR1cm4gZmlsZUlkO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIGZpbGUgJyR7ZmlsZU9iai5nZXRVdGZTdHJpbmcoJ25hbWUnKX0nICh0YXJnZXQ6ICR7cGFyZW50SWR9KS5gKTtcblx0fVxuXG5cdF91cGRhdGVQYXJlbnRTaXplKHBhcmVudEl0ZW0sIHZhbHVlKVxuXHR7XG5cdFx0cGFyZW50SXRlbS5zaXplICs9IHZhbHVlO1xuXG5cdFx0aWYgKHBhcmVudEl0ZW0ucGFyZW50SWQpXG5cdFx0e1xuXHRcdFx0bGV0IGdyYW5kUGFyZW50ID0gdGhpcy5fZGF0YVNvdXJjZS5nZXQocGFyZW50SXRlbS5wYXJlbnRJZCk7XG5cdFx0XHR0aGlzLl91cGRhdGVQYXJlbnRTaXplKGdyYW5kUGFyZW50LCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gJy4vYmFzZS1tb2R1bGUnO1xuaW1wb3J0IHtGaWxlRGF0YVNvdXJjZU1hbmFnZXJ9IGZyb20gJy4uL21hbmFnZXJzL2ZpbGUtZGF0YXNvdXJjZS1tYW5hZ2VyJztcbmltcG9ydCB7Ynl0ZXNUb1NpemV9IGZyb20gJy4uL3V0aWxzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dGVuc2lvbk1hbmFnZXIgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ2V4dGVuc2lvbk1hbicpO1xuXG5cdFx0Ly8gT3V0Z29pbmcgcmVxdWVzdHNcblx0XHR0aGlzLlJFUV9JTklUID0gJ2luaXQnO1xuXHRcdHRoaXMuUkVRX0dFVF9FWFRFTlNJT05TID0gJ2dldEV4dGVuc2lvbnMnO1xuXHRcdHRoaXMuUkVRX0NSRUFURV9GT0xERVIgPSAnY3JlYXRlRm9sZGVyJztcblx0XHR0aGlzLlJFUV9ERUxFVEVfRklMRVMgPSAnZGVsZXRlRXh0RmlsZXMnO1xuXHRcdHRoaXMuUkVRX1JFTE9BRF9FWFRFTlNJT05TID0gJ3JlbG9hZEV4dCc7XG5cblx0XHQvLyBJbmNvbWluZyByZXNwb25zZXNcblx0XHR0aGlzLlJFU1BfTE9DS0VEID0gJ2xvY2snO1xuXHRcdHRoaXMuUkVTUF9JTklUID0gJ2luaXQnO1xuXHRcdHRoaXMuUkVTUF9FWFRFTlNJT05TID0gJ2V4dGVuc2lvbnMnO1xuXHRcdHRoaXMuUkVTUF9GSUxFX0FEREVEID0gJ2ZpbGVBZGRlZCc7XG5cdFx0dGhpcy5SRVNQX0ZJTEVTX0RFTEVURUQgPSAnZmlsZXNEZWxldGVkJztcblx0XHR0aGlzLlJFU1BfRVJST1IgPSAnZXJyb3InO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBwcm9ncmVzcyBiYXJcblx0XHQkKCcjZXhtLXByb2dyZXNzQmFyJykua2VuZG9Qcm9ncmVzc0Jhcih7XG5cdFx0XHRtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcblx0XHRcdHZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBidXR0b25zXG5cdFx0JCgnI2V4bS1yZXRyeUJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblJldHJ5Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjZXhtLXJlZnJlc2hCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SZWZyZXNoQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZmlsZXMgbGlzdFxuXHRcdHRoaXMuX2ZpbGVzTGlzdCA9ICQoJyNleG0tZmlsZUxpc3QnKS5rZW5kb1RyZWVMaXN0KHtcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IFtdLFxuXHRcdFx0cmVzaXphYmxlOiB0cnVlLFxuXHRcdFx0c2VsZWN0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICB7XG5cdFx0XHRcdFx0ZmllbGQ6ICduYW1lJyxcblx0XHRcdFx0XHR0aXRsZTogJ05hbWUnLFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBrZW5kby50ZW1wbGF0ZShgXG5cdFx0XHRcdFx0XHQ8ZGl2ID5cblx0XHRcdFx0XHRcdFx0IyBpZiAoaXNEaXIpIHsgI1xuXHRcdFx0XHRcdFx0XHRcdCMgaWYgKGV4cGFuZGVkKSB7ICNcblx0XHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlci1vcGVuXCI+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdCMgfSBlbHNlIHsgI1xuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtZm9sZGVyXCI+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdCMgfSAjXG5cdFx0XHRcdFx0XHRcdCMgfSBlbHNlIHsgI1xuXHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFyIGZhLWZpbGVcIj48L2k+XG5cdFx0XHRcdFx0XHRcdCMgfSAjXG5cblx0XHRcdFx0XHRcdFx0IzogbmFtZSAjXG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtY29udHJvbHMgZmxleC1ncm93LTEgdGV4dC1yaWdodFwiIGRhdGEtaXRlbS1pZD1cIiM6aWQjXCI+XG5cdFx0XHRcdFx0XHRcdCMgaWYgKGlzRGlyKSB7ICNcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstcHJpbWFyeSBteS0xIGNyZWF0ZS1mb2xkZXItYnRcIj48aSBjbGFzcz1cImZhcyBmYS1mb2xkZXItcGx1c1wiPjwvaT48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQjIGlmIChsZXZlbCA+IDApIHsgI1xuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnkgbXktMSB1cGxvYWQtZmlsZXMtYnRcIj48aSBjbGFzcz1cImZhcyBmYS1maWxlLXVwbG9hZFwiPjwvaT48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQjIH0gI1xuXHRcdFx0XHRcdFx0XHQjIH0gI1xuXG5cdFx0XHRcdFx0XHRcdCMgaWYgKGxldmVsID4gMCAmJiAhaXNQcm90ZWN0ZWQpIHsgI1xuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5IG15LTEgcmVtb3ZlLWZpbGUtYnRcIj48aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdCMgfSAjXG5cblx0XHRcdFx0XHRcdFx0IyBpZiAobGV2ZWwgPT0gMSAmJiAhaXNMaWIpIHsgI1xuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5IG15LTEgcmVsb2FkLWV4dC1idFwiPjxpIGNsYXNzPVwiZmFzIGZhLXJlZG8tYWx0XCI+PC9pPjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQjIH0gI1xuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0YCksXG5cdFx0XHRcdH0sXG4gICAgICAgICAgICAgICAge1xuXHRcdFx0XHRcdGZpZWxkOiAnc2l6ZScsXG5cdFx0XHRcdFx0dGl0bGU6ICdTaXplJyxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24oZGF0YUl0ZW0pIHtcblx0XHRcdFx0XHRcdGRhdGFJdGVtLmJ5dGVzVG9TaXplID0gYnl0ZXNUb1NpemU7IC8vIFBhc3MgYnl0ZXNUb1NpemUgdXRpbGl0eSBmdW5jdGlvbiB0byB0ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0cmV0dXJuIGtlbmRvLnRlbXBsYXRlKGBcblx0XHRcdFx0XHRcdFx0IzogYnl0ZXNUb1NpemUoc2l6ZSwgMiwgJ0tCJykgI1xuXHRcdFx0XHRcdFx0YCkoZGF0YUl0ZW0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0d2lkdGg6IDEyMCxcblx0XHRcdFx0XHRtaW5TY3JlZW5XaWR0aDogNTc2XG5cdFx0XHRcdH0sXG4gICAgICAgICAgICAgICAge1xuXHRcdFx0XHRcdGZpZWxkOiAnbGFzdE1vZCcsXG5cdFx0XHRcdFx0dGl0bGU6ICdMYXN0IE1vZGlmaWVkJyxcblx0XHRcdFx0XHR0ZW1wbGF0ZToga2VuZG8udGVtcGxhdGUoYFxuXHRcdFx0XHRcdFx0Izoga2VuZG8udG9TdHJpbmcobmV3IERhdGUobGFzdE1vZCksICdkZCBNTU0geXl5eSBISDptbTpzcycpICNcblx0XHRcdFx0XHRgKSxcblx0XHRcdFx0XHR3aWR0aDogMjAwLFxuXHRcdFx0XHRcdG1pblNjcmVlbldpZHRoOiA3Njhcblx0XHRcdFx0fSxcbiAgICAgICAgICAgIF0sXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25GaWxlU2VsZWN0ZWRDaGFuZ2UsIHRoaXMpXG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvVHJlZUxpc3QnKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBjYXRjaCBjb250cm9sIGJ1dHRvbiBjbGlja3Mgb24gcm93c1xuXHRcdCQoJyNleG0tZmlsZUxpc3QnKS5vbignY2xpY2snLCAnLmNyZWF0ZS1mb2xkZXItYnQnLCAkLnByb3h5KHRoaXMuX3Nob3dBZGRGb2xkZXJNb2RhbENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2V4bS1maWxlTGlzdCcpLm9uKCdjbGljaycsICcudXBsb2FkLWZpbGVzLWJ0JywgJC5wcm94eSh0aGlzLl9zaG93VXBsb2FkRmlsZXNNb2RhbENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2V4bS1maWxlTGlzdCcpLm9uKCdjbGljaycsICcucmVtb3ZlLWZpbGUtYnQnLCAkLnByb3h5KHRoaXMuX29uUmVtb3ZlRmlsZUNsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2V4bS1maWxlTGlzdCcpLm9uKCdjbGljaycsICcucmVsb2FkLWV4dC1idCcsICQucHJveHkodGhpcy5fb25SZWxvYWRFeHRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHQvLyBJbml0aWFsaXplIFwiYWRkIGZvbGRlclwiIG1vZGFsXG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwgPSAkKCcjZXhtLWFkZEZvbGRlck1vZGFsJyk7XG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFx0c2hvdzogZmFsc2Vcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtb2RhbCBoaWRlIGV2ZW50XG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICQucHJveHkodGhpcy5fb25BZGRGb2xkZXJNb2RhbEhpZGRlbiwgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIEFkZCBidXR0b24gY2xpY2tcblx0XHQkKCcjZXhtLWFkZEZvbGRlckJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFkZEZvbGRlckNsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHZhbGlkYXRpb24gb24gZm9sZGVyIG5hbWUgZm9ybVxuXHRcdHRoaXMuX2FkZEZvbGRlclZhbGlkYXRvciA9ICQoJyNleG0tYWRkRm9sZGVyRm9ybScpLmtlbmRvVmFsaWRhdG9yKHt9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHQvLyBJbml0aWFsaXplIFwidXBsb2FkIGZpbGVzXCIgbW9kYWxcblx0XHR0aGlzLl91cGxvYWRGaWxlc01vZGFsID0gJCgnI2V4bS11cGxvYWRNb2RhbCcpO1xuXHRcdHRoaXMuX3VwbG9hZEZpbGVzTW9kYWwubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFx0c2hvdzogZmFsc2Vcblx0XHR9KTtcblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdXBsb2FkZXJcblx0XHR0aGlzLl91cGxvYWRlciA9ICQoJyNleG0tdXBsb2FkZXInKS5rZW5kb1VwbG9hZCh7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiB7XG5cdFx0XHRcdHNhdmVVcmw6ICdodHRwOi8vbG9jYWxob3N0JywgLy8gVGhpcyB3aWxsIGJlIGNoYW5nZWQgbGF0ZXIgaW4gX29uVXBsb2FkU3RhcnQgbWV0aG9kXG5cdFx0XHRcdGF1dG9VcGxvYWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0ZGlyZWN0b3J5RHJvcDogdHJ1ZSxcblx0XHRcdHVwbG9hZDogJC5wcm94eSh0aGlzLl9vblVwbG9hZFN0YXJ0LCB0aGlzKSxcblx0XHRcdGNvbXBsZXRlOiAkLnByb3h5KHRoaXMuX29uVXBsb2FkRW5kLCB0aGlzKSxcblx0XHRcdGxvY2FsaXphdGlvbjoge1xuXHRcdFx0XHRzZWxlY3Q6ICdTZWxlY3QgZmlsZXMuLi4nXG5cdFx0XHR9XG5cdFx0fSkuZGF0YSgna2VuZG9VcGxvYWQnKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBVcGxvYWQgYnV0dG9uIGNsaWNrXG5cdFx0JCgnI2V4bS1jbGVhckZpbGVzQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQ2xlYXJGaWxlc0NsaWNrLCB0aGlzKSk7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdC8vIFNlbmQgaW5pdGlhbGl6YXRpb24gcmVxdWVzdFxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfSU5JVCk7XG5cdH1cblxuXHRkZXN0cm95KClcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuZGVzdHJveSgpO1xuXG5cdFx0JCgnI2V4bS1yZXRyeUJ0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNleG0tcmVmcmVzaEJ0Jykub2ZmKCdjbGljaycpO1xuXG5cdFx0JCgnI2V4bS1maWxlTGlzdCcpLm9mZignY2xpY2snKTtcblxuXHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm9mZignaGlkZGVuLmJzLm1vZGFsJyk7XG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoJ2Rpc3Bvc2UnKTtcblx0XHQkKCcjZXhtLWFkZEZvbGRlckJ0Jykub2ZmKCdjbGljaycpO1xuXG5cdFx0dGhpcy5fdXBsb2FkRmlsZXNNb2RhbC5tb2RhbCgnZGlzcG9zZScpO1xuXHRcdCQoJyNleG0tY2xlYXJGaWxlc0J0Jykub2ZmKCdjbGljaycpO1xuXHR9XG5cblx0b25FeHRlbnNpb25Db21tYW5kKGNvbW1hbmQsIGRhdGEpXG5cdHtcblx0XHQvLyBNb2R1bGUgY2FuIGJlIGVuYWJsZWQgKG5vIGxvY2tpbmcgZmlsZSBleGlzdHMpXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0lOSVQpXG5cdFx0e1xuXHRcdFx0Ly8gUmV0cmlldmUgZmlsZSBzZXBhcmF0b3Jcblx0XHRcdHRoaXMuX2ZpbGVTZXBhcmF0b3IgPSBkYXRhLmdldFV0ZlN0cmluZygnc2VwJyk7XG5cblx0XHRcdC8vIFJldHJpZXZlIEV4dGVuc2lvbnMnIF9fbGliX18gZm9sZGVyIG5hbWVcblx0XHRcdGNvbnN0IGxpYkZvbGRlciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdsaWInKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGZpbGUgZGF0YSBzb3VyY2UgbWFuYWdlclxuXHRcdFx0dGhpcy5fZmlsZU1hbmFnZXIgPSBuZXcgRmlsZURhdGFTb3VyY2VNYW5hZ2VyKGxpYkZvbGRlciwgW2xpYkZvbGRlcl0sIHRoaXMuX2ZpbGVTZXBhcmF0b3IpO1xuXG5cdFx0XHQvLyBSZXRyaWV2ZSBtb2R1bGUgaWQgc2VudCBieSB0aGUgc2VydmVyIChyZXF1aXJlZCBiZWNhdXNlIG11bHRpcGxlIG1vZHVsZXMgdXNlIGZpbGUgdXBsb2FkaW5nIHNlcnZpY2UpXG5cdFx0XHRjb25zdCB1cGxvYWRNb2R1bGVJZCA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdtb2RJZCcpO1xuXG5cdFx0XHQvLyBTZXQgZmlsZSB1cGxvYWRpbmcgdGFyZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZyA9IHtcblx0XHRcdFx0c2Vzc2lvblRva2VuOiB0aGlzLnNtYXJ0Rm94LnNlc3Npb25Ub2tlbixcblx0XHRcdFx0aG9zdDogdGhpcy5zbWFydEZveC5jb25maWcuaG9zdCxcblx0XHRcdFx0cG9ydDogdGhpcy5zbWFydEZveC5jb25maWcucG9ydCxcblx0XHRcdFx0bW9kdWxlSWQ6IHVwbG9hZE1vZHVsZUlkLFxuXHRcdFx0XHRwcm90b2NvbDogdGhpcy5zbWFydEZveC5jb25maWcudXNlU1NMID8gJ2h0dHBzJyA6ICdodHRwJ1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gUmVxdWVzdCBFeHRlbnNpb24gZmlsZXMgZGF0YSB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHRcdHRoaXMuX3JlZnJlc2hEYXRhTGlzdCgpO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogVGhpcyByZXNwb25zZSBpcyByZXR1cm5lZCBpZiB0aGUgZmlsZSBVcGxvYWRzTG9jay50eHQgZXhpc3RzIGluIHRoZSAvY29uZmlnIGZvbGRlciBvZiB0aGUgc2VydmVyLlxuXHRcdCAqIFRoaXMgaXMgYW4gYWRkaXRpb25hbCBzZWN1cml0eSBtZWFzdXJlIHRvIGF2b2lkIHVud2FudGVkIGZpbGVzIHRvIGJlIHVwbG9hZGVkIGJ5IG1hbGljaXVzIHVzZXJzIGFjY2Vzc2luZyB0aGUgc2VydmVyXG5cdFx0ICogd2l0aCB0aGUgZGVmYXVsdCBjcmVkZW50aWFscywgaW4gY2FzZSB0aGV5IGhhdmUgbm90IGJlZW4gY2hhbmdlZCBieSB0aGUgYWRtaW5pc3RyYXRvciBhZnRlciB0aGUgaW5zdGFsbGF0aW9uLlxuXHRcdCAqIFRoZSBmaWxlIG11c3QgYmUgcmVtb3ZlZCBtYW51YWxseSBiZWZvcmUgYWNjZXNzaW5nIHRoZSBFeHRlbnNpb24gTWFuYWdlciBtb2R1bGUgZm9yIHRoZSBmaXJzdCB0aW1lXG5cdFx0ICovXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfTE9DS0VEKVxuXHRcdHtcblx0XHRcdC8vIFNob3cgd2FybmluZ1xuXHRcdFx0dGhpcy5fc3dpdGNoVmlldygnZXhtLWxvY2tlZCcpO1xuXHRcdH1cblxuXHRcdC8vIEV4dGVuc2lvbnMgZm9sZGVycyBhbmQgZmlsZXNcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9FWFRFTlNJT05TKVxuXHRcdHtcblx0XHRcdC8vIFJldHJpZXZlIEV4dGVuc2lvbiBmaWxlIGxpc3Rcblx0XHRcdGxldCBleHRlbnNpb25zT2JqID0gZGF0YS5nZXRTRlNPYmplY3QoJ2V4dGVuc2lvbnMnKTtcblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSBtYW5hZ2VyXG5cdFx0XHR0aGlzLl9maWxlTWFuYWdlci5pbml0KCk7XG5cblx0XHRcdC8vIEFkZCBsaXN0IHRvIG1hbmFnZXJcblx0XHRcdHRoaXMuX2ZpbGVNYW5hZ2VyLmFkZEZpbGUoZXh0ZW5zaW9uc09iaik7XG5cblx0XHRcdC8vIFNldCBUcmVlTGlzdCBkYXRhIHNvdXJjZVxuXHRcdFx0dGhpcy5fZmlsZXNMaXN0LnNldERhdGFTb3VyY2UodGhpcy5fZmlsZU1hbmFnZXIuZGF0YVNvdXJjZSk7XG5cblx0XHRcdC8vIEV4cGFuZCBmaXJzdCBsZXZlbFxuXHRcdFx0dGhpcy5fZmlsZXNMaXN0LmV4cGFuZCgkKCcjZXhtLWZpbGVMaXN0IHRib2R5PnRyOmVxKDApJykpO1xuXG5cdFx0XHQvLyBFbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UodHJ1ZSk7XG5cblx0XHRcdC8vIFNob3cgbW9kdWxlJ3MgbWFpbiB2aWV3XG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdleG0tbWFpbicpO1xuXHRcdH1cblxuXHRcdC8vIEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIG1hbmFnaW5nIGV4dGVuc2lvbiBmaWxlc1xuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0VSUk9SKVxuXHRcdHtcblx0XHRcdC8vIEhpZGUgYWRkIGZvbGRlciBtb2RhbFxuXHRcdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0Ly8gUmUtZW5hYmxlIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHQvLyBTaG93IGFuIGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJykpO1xuXHRcdH1cblxuXHRcdC8vIEV4dGVuc2lvbiBmb2xkZXIgb3IgZmlsZSBhZGRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0ZJTEVfQURERUQpXG5cdFx0e1xuXHRcdFx0Ly8gR2V0IG5hbWUgb2YgdGhlIHVzZXIgd2hvIGFkZGVkIHRoZSBmaWxlL2ZvbGRlclxuXHRcdFx0Y29uc3QgcmVxdWVzdGVyID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdFx0Ly8gR2V0IHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBmaWxlL2ZvbGRlciBiZWluZyBhZGRlZFxuXHRcdFx0Y29uc3QgZmlsZU9iaiA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCdmaWxlJyk7XG5cblx0XHRcdC8vIEdldCB0aGUgdGFyZ2V0IGZvbGRlciB3aGVyZSB0aGUgbmV3IGZpbGUvZm9sZGVyIHNob3VsZCBiZSBhZGRlZFxuXHRcdFx0Y29uc3QgcGFyZW50UGF0aCA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdwYXJlbnQnKTtcblxuXHRcdFx0Ly8gR2V0IHRoZSBmbGFnIG5vdGlmeWluZyB0aGlzIHdhcyBhIGZpbGUgdXBsb2FkXG5cdFx0XHRjb25zdCBpc1VwbG9hZCA9IGRhdGEuZ2V0Qm9vbCgnaXNVcGxvYWQnKTtcblxuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdC8vIEFkZC91cGRhdGUgaXRlbSBvbiBkYXRhIHNvdXJjZVxuXHRcdFx0XHRjb25zdCBmaWxlUGF0aCA9IHRoaXMuX2ZpbGVNYW5hZ2VyLmFkZEZpbGVUb1BhcmVudChmaWxlT2JqLCBwYXJlbnRQYXRoKTtcblxuXHRcdFx0XHQvLyBSZWZyZXNoIHZpZXdcblx0XHRcdFx0dGhpcy5fZmlsZXNMaXN0LnJlZnJlc2goKTtcblxuXHRcdFx0XHRpZiAocmVxdWVzdGVyID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBFeHBhbmQgcGFyZW50XG5cdFx0XHRcdFx0dGhpcy5fZmlsZXNMaXN0LmV4cGFuZCgkKGAjZXhtLWZpbGVMaXN0IC5maWxlLWNvbnRyb2xzW2RhdGEtaXRlbS1pZD1cIiR7JC5lc2NhcGVTZWxlY3RvcihwYXJlbnRQYXRoKX1cIl1gKS5jbG9zZXN0KCd0cicpKTtcblxuXHRcdFx0XHRcdGlmICghaXNVcGxvYWQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly8gSGlkZSBtb2RhbFxuXHRcdFx0XHRcdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdFx0Ly8gU2VsZWN0IHVwbG9hZCBmaWxlXG5cdFx0XHRcdFx0XHR0aGlzLl9maWxlc0xpc3Quc2VsZWN0KCQoYCNleG0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHskLmVzY2FwZVNlbGVjdG9yKGZpbGVQYXRoKX1cIl1gKS5jbG9zZXN0KCd0cicpKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBVcGRhdGUgc2VsZWN0aW9uXG5cdFx0XHRcdFx0dGhpcy5fb25GaWxlU2VsZWN0ZWRDaGFuZ2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHRcdGlmICghaXNVcGxvYWQpXG5cdFx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKGBGb2xkZXIgY3JlYXRlZGAsIGBBZG1pbmlzdHJhdG9yICR7cmVxdWVzdGVyfSBjcmVhdGVkIGZvbGRlcjogPHN0cm9uZz4ke2ZpbGVQYXRofTwvc3Ryb25nPmApO1xuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oYEZpbGUgdXBsb2FkZWRgLCBgQWRtaW5pc3RyYXRvciAke3JlcXVlc3Rlcn0gdXBsb2FkZWQgZmlsZTogPHN0cm9uZz4ke2ZpbGVQYXRofTwvc3Ryb25nPmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gVGhpcyBzaG91bGQgbm90IGhhcHBlbi4uLiBkYXRhIHNvdXJjZSBpcyBjb3JydXB0ZWQ/XG5cdFx0XHRcdGlmIChyZXF1ZXN0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZS5tZXNzYWdlLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRW5hYmxlIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlSW50ZXJmYWNlKHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEV4dGVuc2lvbiBmaWxlcyBkZWxldGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfRklMRVNfREVMRVRFRClcblx0XHR7XG5cdFx0XHQvLyBHZXQgbmFtZSBvZiB0aGUgdXNlciB3aG8gZGVsZXRlZCB0aGUgZmlsZS9zXG5cdFx0XHRjb25zdCByZXF1ZXN0ZXIgPSBkYXRhLmdldFV0ZlN0cmluZygndXNlcicpO1xuXG5cdFx0XHQvLyBHZXQgdGhlIGxpc3Qgb2YgZGVsZXRlZCBmaWxlc1xuXHRcdFx0bGV0IGZpbGVzID0gZGF0YS5nZXRTRlNBcnJheSgnZmlsZXMnKTtcblxuXHRcdFx0bGV0IGZpbGVzQXJyID0gW107XG5cblx0XHRcdC8vIFVwZGF0ZSBkYXRhIHNvdXJjZVxuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBmaWxlcy5zaXplKCk7IGorKylcblx0XHRcdHtcblx0XHRcdFx0bGV0IHBhdGggPSBmaWxlcy5nZXRVdGZTdHJpbmcoaik7XG5cdFx0XHRcdGZpbGVzQXJyLnB1c2gocGF0aCk7XG5cblx0XHRcdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0XHQvLyBSZW1vdmUgaXRlbSBmcm9tIGRhdGEgc291cmNlOyBwYXJlbnQgaXRlbSBpcyByZXR1cm5lZFxuXHRcdFx0XHRsZXQgcGFyZW50SXRlbSA9IHRoaXMuX2ZpbGVNYW5hZ2VyLnJlbW92ZUZpbGUocGF0aCk7XG5cblx0XHRcdFx0Ly8gQ29sbGFwc2UgcGFyZW50IGlmIHRoZSBsYXN0IG9mIGl0cyBjaGlsZHJlbiB3YXMgZGVsZXRlZFxuXHRcdFx0XHRpZiAocGFyZW50SXRlbSAmJiAhcGFyZW50SXRlbS5oYXNDaGlsZHJlbilcblx0XHRcdFx0XHR0aGlzLl9maWxlc0xpc3QuY29sbGFwc2UoJChgI2V4bS1maWxlTGlzdCAuZmlsZS1jb250cm9sc1tkYXRhLWl0ZW0taWQ9XCIkeyQuZXNjYXBlU2VsZWN0b3IocGFyZW50SXRlbS5pZCl9XCJdYCkuY2xvc2VzdCgndHInKSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXF1ZXN0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbihgJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaXNEaXIgPyAnRm9sZGVyJyA6ICdGaWxlJ30gZGVsZXRlZGAsIGAke3RoaXMuX3NlbGVjdGVkSXRlbS5pc0RpciA/ICdGb2xkZXInIDogJ0ZpbGUnfSAnJHt0aGlzLl9zZWxlY3RlZEl0ZW0ubmFtZX0nIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cblx0XHRcdFx0dGhpcy5fc2VsZWN0ZWRJdGVtID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oYEZpbGUgZGVsZXRlZGAsIGBBZG1pbmlzdHJhdG9yICR7cmVxdWVzdGVyfSBkZWxldGVkIHRoZSBmb2xsb3dpbmcgZmlsZSR7ZmlsZXNBcnIubGVuZ3RoID4gMSA/ICdzJyA6ICcnfTogPHN0cm9uZz4ke2ZpbGVzQXJyLmpvaW4oJzxicj4gJyl9PC9zdHJvbmc+YCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlc2V0IHNlbGVjdGlvblxuXHRcdFx0dGhpcy5fb25GaWxlU2VsZWN0ZWRDaGFuZ2UoKTtcblx0XHR9XG5cblx0XHQvLyBlbHNlIGlmICgpXG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBVSSBFVkVOVCBMSVNURU5FUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfb25SZXRyeUNsaWNrKClcblx0e1xuXHRcdHRoaXMuX3N3aXRjaFZpZXcoJ2V4bS1pbml0Jyk7XG5cblx0XHQvLyBSZS1zZW5kIGluaXRpYWxpemF0aW9uIHJlcXVlc3Rcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0lOSVQpO1xuXHR9XG5cblx0X29uUmVmcmVzaENsaWNrKClcblx0e1xuXHRcdHRoaXMuX2ZpbGVzTGlzdC5jbGVhclNlbGVjdGlvbigpO1xuXHRcdHRoaXMuX3JlZnJlc2hEYXRhTGlzdCgpO1xuXHR9XG5cblx0X29uRmlsZVNlbGVjdGVkQ2hhbmdlKClcblx0e1xuXHRcdC8vIEhpZGUgY29udHJvbCBidXR0b25zIG9uIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtXG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHRcdCQoYCNleG0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHskLmVzY2FwZVNlbGVjdG9yKHRoaXMuX3NlbGVjdGVkSXRlbS5pZCl9XCJdYCkuaGlkZSgpO1xuXG5cdFx0Ly8gR2V0IHNlbGVjdGVkIGl0ZW1cblx0XHRsZXQgc2VsZWN0ZWRSb3dzID0gdGhpcy5fZmlsZXNMaXN0LnNlbGVjdCgpO1xuXG5cdFx0aWYgKHNlbGVjdGVkUm93cy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdC8vIFNhdmUgcmVmLiB0byBzZWxlY3RlZCBpdGVtXG5cdFx0XHR0aGlzLl9zZWxlY3RlZEl0ZW0gPSB0aGlzLl9maWxlc0xpc3QuZGF0YUl0ZW0oc2VsZWN0ZWRSb3dzWzBdKTtcblxuXHRcdFx0Ly8gU2hvdyBjb250cm9sIGJ1dHRvbnMgb24gbmV3IHNlbGVjdGVkIGl0ZW1cblx0XHRcdCQoYCNleG0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHskLmVzY2FwZVNlbGVjdG9yKHRoaXMuX3NlbGVjdGVkSXRlbS5pZCl9XCJdYCkuc2hvdygpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9zZWxlY3RlZEl0ZW0gPSBudWxsO1xuXHR9XG5cblx0X3Nob3dBZGRGb2xkZXJNb2RhbENsaWNrKClcblx0e1xuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0gJiYgdGhpcy5fc2VsZWN0ZWRJdGVtLmlzRGlyKVxuXHRcdHtcblx0XHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKCdzaG93Jyk7XG5cdFx0XHQkKCcjZXhtLWZvbGRlck5hbWVJbicpLmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cblx0X29uQWRkRm9sZGVyQ2xpY2soKVxuXHR7XG5cdFx0Ly8gVGhlIHBhcmVudCBmb2xkZXIgY291bGQgaGF2ZSBiZWVuIGRlbGV0ZWQgd2hpbGUgdXNlciBpcyBzdGlsbCB0eXBpbmcgdGhlIG5hbWUgb2YgdGhlIG5ldyBjaGlsZCBmb2xkZXJcblx0XHRpZiAoIXRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHR7XG5cdFx0XHR0aGlzLl9hZGRGb2xkZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIGZvbGRlcjsgdGhlIHBhcmVudCBmb2xkZXIgZG9lc25cXCd0IGV4aXN0LicpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hZGRGb2xkZXJWYWxpZGF0b3IudmFsaWRhdGUoKSlcblx0XHR7XG5cdFx0XHQvLyBEaXNhYmxlIG1vZGFsIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlQWRkRm9sZGVyTW9kYWwoZmFsc2UpO1xuXG5cdFx0XHRsZXQgZGF0YSA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdGRhdGEucHV0VXRmU3RyaW5nKCdmb2xkZXInLCB0aGlzLl9zZWxlY3RlZEl0ZW0uaWQgKyB0aGlzLl9maWxlU2VwYXJhdG9yICsgJCgnI2V4bS1mb2xkZXJOYW1lSW4nKS52YWwoKSk7XG5cblx0XHRcdC8vIFNlbmQgcmVxdWVzdCB0byBzZXJ2ZXJcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfQ1JFQVRFX0ZPTERFUiwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0X29uQWRkRm9sZGVyTW9kYWxIaWRkZW4oKVxuXHR7XG5cdFx0JCgnI2V4bS1mb2xkZXJOYW1lSW4nKS52YWwoJycpO1xuXHRcdHRoaXMuX3Jlc2V0QWRkRm9sZGVyVmFsaWRhdGlvbigpO1xuXG5cdFx0Ly8gRW5hYmxlIG1vZGFsIGludGVyZmFjZVxuXHRcdHRoaXMuX2VuYWJsZUFkZEZvbGRlck1vZGFsKHRydWUpO1xuXHR9XG5cblx0X3Nob3dVcGxvYWRGaWxlc01vZGFsQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHRcdHRoaXMuX3VwbG9hZEZpbGVzTW9kYWwubW9kYWwoJ3Nob3cnKTtcblx0fVxuXG5cdF9vbkNsZWFyRmlsZXNDbGljaygpXG5cdHtcblx0XHR0aGlzLl91cGxvYWRlci5jbGVhckFsbEZpbGVzKCk7XG5cdH1cblxuXHRfb25VcGxvYWRTdGFydChlKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBjbGVhciBidXR0b25cblx0XHQkKCcjZXhtLWNsZWFyRmlsZXNCdCcpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cblx0XHQvLyBTZXQgZGVzdGluYXRpb24gdXJsXG5cdFx0Y29uc3QgdXJsID0gdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLnByb3RvY29sICsgJzovLycgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuaG9zdCArICc6JyArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5wb3J0ICsgJy9CbHVlQm94L1NGUzJYRmlsZVVwbG9hZD9zZXNzSGFzaElkPScgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuc2Vzc2lvblRva2VuO1xuXHRcdFxuXHRcdGUuc2VuZGVyLm9wdGlvbnMuYXN5bmMuc2F2ZVVybCA9IHVybDtcblxuXHRcdC8vIFNldCBwYXlsb2FkXG5cdFx0Y29uc3QgcGFyYW1zID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0cGFyYW1zLmFwcGVuZCgnX19tb2R1bGUnLCB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcubW9kdWxlSWQpO1xuXHRcdHBhcmFtcy5hcHBlbmQoJ19fdGFyZ2V0JywgdGhpcy5fc2VsZWN0ZWRJdGVtLmlkKTtcblxuXHRcdGZvciAobGV0IGYgPSAwOyBmIDwgZS5maWxlcy5sZW5ndGg7IGYrKylcblx0XHRcdHBhcmFtcy5hcHBlbmQoJ2ZpbGVzW10nLCBlLmZpbGVzW2ZdLnJhd0ZpbGUpO1xuXG5cdFx0ZS5mb3JtRGF0YSA9IHBhcmFtcztcblx0fVxuXG5cdF9vblVwbG9hZEVuZChlKVxuXHR7XG5cdFx0Ly8gRW5hYmxlIGNsZWFyIGJ1dHRvblxuXHRcdCQoJyNleG0tY2xlYXJGaWxlc0J0JykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG5cdH1cblxuXHRfb25GaWxlc1VwbG9hZEVuZChyZXNwb25zZSlcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG86IHdlIGhhdmUgdG8gd2FpdCB0aGUgdXBsb2FkIHByb2Nlc3MgY29tcGxldGlvbiB0byBiZSBzaWduYWxlZCBieSB0aGUgc2VydmVyIHRocm91Z2ggdGhlIGRlZGljYXRlZCBFeHRlbnNpb24gcmVzcG9uc2VcblxuXHRcdC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRcdC8vIFRPRE8gU2hvdWxkIHdlIGhhbmRsZSB0aGlzIHJlc3BvbnNlIGluIHNvbWUgd2F5PyBGb3Igc29tZSB1bmtub3duIHJlYXNvbiB3ZSBhbHdheXMgZ2V0IG9rPWZhbHNlIGFuZCBzdGF0dXM9MFxuXHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLm9rKVxuXHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cylcblx0fVxuXG5cdF9vblJlbW92ZUZpbGVDbGljaygpXG5cdHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtKVxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd0NvbmZpcm1XYXJuaW5nKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBzZWxlY3RlZCAke3RoaXMuX3NlbGVjdGVkSXRlbS5pc0RpciA/ICdmb2xkZXInIDogJ2ZpbGUnfT88YnI+PGJyPlBhdGg6IDxzdHJvbmc+JHt0aGlzLl9zZWxlY3RlZEl0ZW0uaWR9PC9zdHJvbmc+YCwgJC5wcm94eSh0aGlzLl9vblJlbW92ZUZpbGVDb25maXJtLCB0aGlzKSk7XG5cdH1cblxuXHRfb25SZW1vdmVGaWxlQ29uZmlybSgpXG5cdHtcblx0XHQvLyBEaXNhYmxlIGludGVyZmFjZVxuXHRcdHRoaXMuX2VuYWJsZUludGVyZmFjZShmYWxzZSk7XG5cblx0XHQvLyBSZXF1ZXN0IEV4dGVuc2lvbiBmaWxlcyByZW1vdmFsXG5cdFx0Ly8gTk9URTogZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBBZG1pblRvb2wsIHRoZSBmaWxlIHRvIGJlIGRlbGV0ZWQgaXMgc2VudFxuXHRcdC8vIGluIGFuIGFycmF5IG9mIHN0cmluZ3MsIGV2ZW4gaWYgd2UgY2FuJ3QgZGVsZXRlIG1vcmUgdGhhbiAxIGZpbGUgYXQgb25jZSBpbiB0aGlzIEFkbWluVG9vbFxuXG5cdFx0bGV0IGZpbGVzID0gbmV3IFNGUzJYLlNGU0FycmF5KCk7XG5cdFx0ZmlsZXMuYWRkVXRmU3RyaW5nKHRoaXMuX3NlbGVjdGVkSXRlbS5pZCk7XG5cblx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdHBhcmFtcy5wdXRTRlNBcnJheSgnZmlsZXMnLCBmaWxlcyk7XG5cblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0RFTEVURV9GSUxFUywgcGFyYW1zKTtcblx0fVxuXG5cdF9vblJlbG9hZEV4dENsaWNrKClcblx0e1xuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0pXG5cdFx0e1xuXHRcdFx0bGV0IHBhdGhBcnIgPSB0aGlzLl9zZWxlY3RlZEl0ZW0uaWQuc3BsaXQodGhpcy5fZmlsZVNlcGFyYXRvcik7XG5cblx0XHRcdGlmIChwYXRoQXJyLmxlbmd0aCA+IDEpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlcXVlc3QgRXh0ZW5zaW9uIHJlbG9hZFxuXHRcdFx0XHQvLyBOT1RFOiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIEFkbWluVG9vbCwgdGhlIEV4dGVuc2lvbiB0byBiZSByZWxvYWRlZCBpcyBzZW50XG5cdFx0XHRcdC8vIGluIGFuIGFycmF5IG9mIHN0cmluZ3MsIGV2ZW4gaWYgd2UgY2FuJ3QgcmVsb2FkIG1vcmUgdGhhbiAxIEV4dGVuc2lvbiBhdCBvbmNlIGluIHRoaXMgQWRtaW5Ub29sXG5cblx0XHRcdFx0bGV0IGV4dFRvUmVsb2FkID0gW107XG5cdFx0XHRcdGV4dFRvUmVsb2FkLnB1c2gocGF0aEFyclsxXSk7XG5cblx0XHRcdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdFx0cGFyYW1zLnB1dFV0ZlN0cmluZ0FycmF5KCdleHRlbnNpb25zJywgZXh0VG9SZWxvYWQpO1xuXG5cdFx0XHRcdC8vIFNlbmQgcmVxdWVzdCB0byBzZXJ2ZXJcblx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9SRUxPQURfRVhURU5TSU9OUywgcGFyYW1zKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfc3dpdGNoVmlldyh2aWV3SWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhtLXZpZXdzdGFjaycpLnNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdJZCk7XG5cdH1cblxuXHRfZW5hYmxlSW50ZXJmYWNlKGVuYWJsZSlcblx0e1xuXHRcdCQoJyNleG0tZmlsZUxpc3QnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXHRcdCQoJyNleG0tcmVmcmVzaEJ0JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblx0fVxuXG5cdF9yZWZyZXNoRGF0YUxpc3QoKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBpbnRlcmZhY2Vcblx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0Ly8gU2VuZCByZXF1ZXN0IHRvIHNlcnZlclxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX0VYVEVOU0lPTlMpXG5cdH1cblxuXHRfcmVzZXRBZGRGb2xkZXJWYWxpZGF0aW9uKClcblx0e1xuXHRcdHRoaXMuX2FkZEZvbGRlclZhbGlkYXRvci5oaWRlTWVzc2FnZXMoKTtcblxuXHRcdC8vIFRoZSBtZXRob2QgYWJvdmUgZG9lc24ndCByZW1vdmUgdGhlIGstaW52YWxpZCBjbGFzc2VzIGFuZCBhcmlhLWludmFsaWQ9XCJ0cnVlXCIgYXR0cmlidXRlcyBmcm9tIGlucHV0c1xuXHRcdC8vIExldCdzIGRvIGl0IG1hbnVhbGx5XG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJGb3JtIC5rLWludmFsaWQnKS5yZW1vdmVDbGFzcygnay1pbnZhbGlkJyk7XG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJGb3JtIFthcmlhLWludmFsaWQ9XCJ0cnVlXCJdJykucmVtb3ZlQXR0cignYXJpYS1pbnZhbGlkJyk7XG5cdH1cblxuXHRfZW5hYmxlQWRkRm9sZGVyTW9kYWwoZW5hYmxlKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBtb2RhbCBjbG9zZSBidXR0b25zXG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJNb2RhbCBidXR0b25bZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXG5cdFx0Ly8gRGlzYWJsZSBhZGQgYnV0dG9uXG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJCdCcpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cblx0XHQvLyBEaXNhYmxlIGZpZWxkc2V0XG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJGb3JtJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgR0VUVEVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9