/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-9"],{

/***/ "./src/components/module-specific/ssl-certificate-manager.js":
/*!*******************************************************************!*\
  !*** ./src/components/module-specific/ssl-certificate-manager.js ***!
  \*******************************************************************/
/*! exports provided: SslCertificateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SslCertificateManager", function() { return SslCertificateManager; });
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utilities */ "./src/utils/utilities.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_1__);



class SslCertificateManager extends HTMLElement
{
	constructor()
	{
	    super();

		this._modalHtml = `
			<div class="modal" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-primary" id="uploadModalTitle">SSL Certificate Manager</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body in-flow-invalid-msg">
							<fieldset id="uploadFieldset">
								<div id="uploaderSubform">
									<div class="form-group">
										<div class="col-form-label form-label-container">
											<label for="uploader" class="form-label">Certificate keystore (jks) <i class="fas fa-question-circle text-muted help" title="SSL certificate's protected keystore file to be uploaded to the server, in jks format"></i></label>
										</div>
										<div class="inner-widget">
											<input type="file" id="uploader" name="uploader" accept=".jks" data-upload-msg="Select a file">
											<span class="k-invalid-msg position-static" data-for="uploader"></span>
										</div>
									</div>
								</div>
								<div id="passwordsSubform">
									<div class="form-row">
										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="ksPassword" class="form-label">Keystore password <i class="fas fa-question-circle text-muted help" title="Password used to protect the certificate keystore"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="ksPassword" name="ksPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="ksPassword"></span>
											</div>
										</div>

										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="confirmKsPassword" class="form-label">Confirm password <i class="fas fa-question-circle text-muted help" title="Keystore password confirmation"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="confirmKsPassword" name="confirmKsPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="confirmKsPassword"></span>
											</div>
										</div>
									</div>

									<p><em>For additional security, enter again and confirm your SFS2X administration password.</em></p>

									<div class="form-row">
										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="adminPassword" class="form-label">Admin password <i class="fas fa-question-circle text-muted help" title="SmartFoxServer 2X remote administration password"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="adminPassword" name="adminPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="adminPassword"></span>
											</div>
										</div>

										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="confirmAdminPassword" class="form-label">Confirm password <i class="fas fa-question-circle text-muted help" title="SmartFoxServer 2X remote administration password confirmation"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="confirmAdminPassword" name="confirmAdminPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="confirmAdminPassword"></span>
											</div>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
						<div class="modal-footer flex-column">
							<div class="d-flex w-100">
								<div class="flex-grow-1 text-left">
									<button id="uploadSslButton" type="button" class="k-button k-primary"><i class="fas fa-upload mr-1"></i>Upload certificate</button>
									<i id="uploadSpinner" class="fas fa-circle-notch fa-spin text-primary align-middle ml-1"></i>
								</div>
								<div class="flex-grow-1 text-right">
									<button type="button" class="k-button k-secondary" data-dismiss="modal">Cancel</button>
								</div>
							</div>
							<div id="uploadErrorMsg" class="text-danger mt-3"></div>
						</div>
					</div>
				</div>
			</div>
		`;

		//-------------------------------------------

		$(this).append(`
			<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
				<label class="form-label">Upload certificate <i class="fas fa-question-circle text-muted help" title="Upload an SSL certificate's protected keystore to the server"></i></label>
			</div>
			<div class="inner-widget align-self-center align-self-sm-start col-auto">
				<button id="manageSslButton" type="button" class="k-button k-primary" disabled><i class="fas fa-cog mr-1"></i>Manage</button>
			</div>
		`);

		// Add listeners to Manage button click
		$('#manageSslButton', $(this)).on('click', $.proxy(this._onManageSslClick, this));
	}

	destroy()
	{
		// Remove event listener
		$('#manageSslButton', $(this)).off('click');

		// Hide modal (which in turn destroys it)
		let modalElement = $('#uploadModal', $(this));

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

		// Enable/disable Manage button
		$('#manageSslButton', $(this)).attr('disabled', !value);

		// Enable/disable modal
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Disable modal close buttons
			$('button[data-dismiss="modal"]', modalElement).attr('disabled', !value);

			// Disable upload button
			$('#uploadSslButton', modalElement).attr('disabled', !value);

			// Disable fieldset
			$('#uploadFieldset', modalElement).attr('disabled', !value);
		}
	}

	get uploadTargetConfig()
	{
		return this._uploadTargetConfig;
	}

	set uploadTargetConfig(data)
	{
		this._uploadTargetConfig = data;
	}

	_onManageSslClick()
	{
		// Initialize and show modal
		this._showModal();
	}

	_onUploadSslClick()
	{
		if (this._validate())
			this._startSslCertUpload();
	}

	_showModal()
	{
		// Append modal html
		$(this).append(this._modalHtml);

		let modalElement = $('#uploadModal', $(this));

		// Hide SSL certificate upload spinner and error message container
		$('#uploadSpinner', modalElement).hide();
		$('#uploadErrorMsg', modalElement).hide();
		$('#uploadErrorMsg', modalElement).text('');

		// Add listener to Upload button click
		$('#uploadSslButton', modalElement).on('click', $.proxy(this._onUploadSslClick, this));

		// Add listener to modal hide event
		modalElement.on('hidden.bs.modal', $.proxy(this._destroyModal, this));

		// Initialize kendo uploader
		this._uploadWidget = modalElement.find('#uploader').kendoUpload({
			allowedExtensions: ['.jks'],
			multiple: false,
			template: function(dataItem) {
				dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_0__["bytesToSize"]; // Pass bytesToSize utility function to template
				return kendo.template(`
					<span class='k-progress w-100'></span>
					<span class="">
						<span class="k-file-name" title="#=name#">#=name#</span>
						<span class="k-file-size">Size: #=bytesToSize(size, 1, 'Bytes')#</span>
					</span>
				`)(dataItem);
			},
	        localization: {
	            select: 'Select file...'
	        }
        }).data('kendoUpload');

		// Initialize kendo validation on uploader subform
		// NOTE: we use separate validators to be able to disable 'validateOnBlur' on the uploader,
		// because it causes the error message to appear as soon as the "Select file" button is clicked
		this._validator1 = modalElement.find('#uploaderSubform').kendoValidator({
			validateOnBlur: false,
			rules: {
				upload: function(input) {
					let valid = false;
					if (input.is('[type=file]'))
						valid = input.closest('.k-upload').find('.k-file').length > 0;

					return valid;
	            }
			}
		}).data('kendoValidator');

		// Initialize kendo validation on passwords subform
		this._validator2 = modalElement.find('#passwordsSubform').kendoValidator({
			validateOnBlur: true,
			rules: {
				verifyKsPassword: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=confirmKsPassword]'))
						valid = input.val() === $(this).find('#ksPassword').val();
					return valid;
				}, this),
				verifyAdmPassword: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=confirmAdminPassword]'))
						valid = input.val() === $(this).find('#adminPassword').val();
					return valid;
				}, this)
			},
			messages: {
				verifyKsPassword: 'Password not matching',
				verifyAdmPassword: 'Password not matching',
			}
		}).data('kendoValidator');

		// Initialize bootstrap modal
		modalElement.modal({
			backdrop: 'static',
			keyboard: false,
		});
	}

	_destroyModal()
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Remove listeners
			$('#uploadSslButton', modalElement).off('click');
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

	_validate()
	{
		let val1 = this._validator1.validate();
		let val2 = this._validator2.validate();

		return val1 && val2;
	}

	_startSslCertUpload()
	{
		if (!this._uploadTargetConfig)
			throw new Error('Upload target configuration not set');

		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			let certData = {};
			certData.file = this._uploadWidget.getFiles()[0];
			certData.ksPassword = $('#ksPassword', modalElement).val();
			certData.adminPassword = $('#adminPassword', modalElement).val();

			// Disable modal
			this.enabled = false;

			// Hide previous error and show spinner
			$('#uploadSpinner', modalElement).show();
			$('#uploadErrorMsg', modalElement).hide();
			$('#uploadErrorMsg', modalElement).text('');

			//=================================================================

			// Generate Init Vector
			let rngValues = [];
			for (let i = 0; i < 16; i++)
				rngValues.push(Math.floor(Math.random() * 256));

			let iv = new Uint8Array(rngValues);

			// Generate secret key by MD5-encoding admin password + session token
			let md5Pass = this._binaryMD5(certData.adminPassword + this._uploadTargetConfig.sessionToken);

			// Encrypt keystore password via AES (128bit)
			let encryptedPwd = this._aesEncrypt(certData.ksPassword, md5Pass, iv);

			// Encode IV using Base64
			let encodedIv = this._b64Encode(iv);

			// Encode encrypted password using Base64
			let encodedPwd = this._b64Encode(encryptedPwd);

			//=================================================================

			// Set parameters to be sent with the certificate keystore file
			const params = new FormData();
			params.append('files[]', certData.file.rawFile);
			params.append('__iv', encodedIv);
			params.append('__password', encodedPwd);
			params.append('__module', this._uploadTargetConfig.moduleId);

			// Set destination url
			const url = this._uploadTargetConfig.protocol + '://' + this._uploadTargetConfig.host + ':' + this._uploadTargetConfig.port + '/BlueBox/SFS2XFileUpload?sessHashId=' + this._uploadTargetConfig.sessionToken;

			// Start upload
			fetch(url, {
				method: 'POST',
				body: params,
				mode: 'no-cors'
			}).then($.proxy(this._onSslCertUploadEnd, this));
		}
	}

	_onSslCertUploadEnd(response)
	{
		// Nothing to do: we have to wait the upload process completion to be signaled by the server through the dedicated Extension response

		//=================================================================

		// TODO Should we handle this response in some way? For some unknown reason we always get ok=false and status=0
		//console.log(response)
		//console.log(response.ok)
		//console.log(response.status)
	}

	/**
	 * Method called by parent when upload failed.
	 */
	onSslCertUploadError(error)
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Enable modal
			this.enabled = true;

			// Show upload error
			$('#uploadErrorMsg', modalElement).show();
			$('#uploadErrorMsg', modalElement).text(error + '.');

			// Hide spinner
			$('#uploadSpinner', modalElement).hide();
		}
	}

	/**
	 * Method called by parent when upload is completed successfully.
	 */
	onSslCertUploadSuccess()
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Enable modal
			this.enabled = true;

			// Hide spinner
			$('#uploadSpinner', modalElement).hide();

			// Hide modal
			modalElement.modal('hide');
		}
	}

	// *****************************************************************

	/*
	 * Takes a string and returns the MD5 as Uint8Array
	 */
	_binaryMD5(str)
	{
		let MD5 = new SFS2X.MD5();
		let hexStr = MD5.hex_md5(str);

		return this._hexByteStringToByteArray(hexStr);
	}

	/*
	 * Hex bytes ---> Actual byte[] as Uint8Array
	 */
	_hexByteStringToByteArray(hexByteString)
	{
	    let bytes = new Uint8Array(16); // MD5 fixed output size

	    for (let i = 0; i < hexByteString.length;)
	    {
	        let hexByte = hexByteString[i++] + hexByteString[i++];
	        let byte = parseInt(hexByte, 16);

	        bytes[i / 2 - 1] = byte;
	    }

	    return bytes;
	}

	/*
	 * Encrypt using AES, mode CBC, PKCS#7 padding
	 *
	 * text 		-> the text we want to encode
	 * key 		-> the AES key
	 * iv  		-> the AES/CBC init vector
	 *
	 * Returns 	-> Uint8Array
	 */
	_aesEncrypt(text, key, iv)
	{
		let textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.utf8.toBytes(text); 		// Get UTF-8 bytes
		let aesCBC = new aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.ModeOfOperation.cbc(key, iv);	// Init CBC mode
		textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.padding.pkcs7.pad(textBytes); 		// PKCS#7 padding

		// Encrypt
		return aesCBC.encrypt(textBytes);
	}

	/*
	 * Encode passed byte array --> Base64 representation
	 * Returns --> string
	 */
	_b64Encode(barray)
	{
		return btoa(String.fromCharCode.apply(null, barray));
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('ssl-certificate-manager'))
	window.customElements.define('ssl-certificate-manager', SslCertificateManager);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/modules/server-configurator.js":
/*!********************************************!*\
  !*** ./src/modules/server-configurator.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServerConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");
/* harmony import */ var _components_module_specific_ssl_certificate_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/module-specific/ssl-certificate-manager */ "./src/components/module-specific/ssl-certificate-manager.js");




class ServerConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('serverConfig');

		// Outgoing requests
		this.REQ_INIT = 'init';
		this.REQ_GET_CONFIG = 'getConfig';
		this.REQ_UPDATE_CONFIG = 'updConfig';
		this.REQ_UPDATE_GEO_DB = 'updGeoDb';

		// Incoming responses
		this.RESP_INIT = 'init';
		this.RESP_CONFIG = 'config';
		this.RESP_CONFIG_UPDATE_CONFIRM = 'configUpdate';
		this.RESP_CONFIG_CHANGED_ALERT = 'configAlert';
		this.RESP_SSL_UPLOAD_ERROR = 'sslUploadError';
		this.RESP_SSL_UPLOAD_CONFIRM = 'sslUpload';
		this.RESP_UPDATE_GEO_DB = 'geoDbUpdate';
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

		// Initialize progress bar
		$('#src-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Create interface builder instance
		this._interfaceBuilder = new _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__["ConfigInterfaceBuilder"]();

		// Add listener to GeoLite2 database update button
		$('#src-updateGeolocDbButton').on('click', $.proxy(this._onUpdateGeolocDbClick, this));

		// Add listener to interface buttons
		$('#src-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#src-submitButton').on('click', $.proxy(this._onSubmitClick, this));

		// Save ref to SSL Manager
		this._sslCertManager = document.getElementById('src-sslCertManager');

		//-----------------------------------*/

		// Send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Destroy SSL Certificate Manager
		this._sslCertManager.destroy();

		// Remove interface buttons click listeners
		$('#src-updateGeolocDbButton').off('click');
		$('#src-reloadButton').off('click');
		$('#src-submitButton').off('click');

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		// Initialization data received
		if (command == this.RESP_INIT)
		{
			// Retrieve module id sent by the server (required because multiple modules use file uploading service)
			const uploadModuleId = data.getUtfString('modId');

			// Set SSL upload manager target configuration
			this._sslCertManager.uploadTargetConfig = {
				sessionToken: this.smartFox.sessionToken,
				host: this.smartFox.config.host,
				port: this.smartFox.config.port,
				moduleId: uploadModuleId,
				protocol: this.smartFox.config.useSSL ? 'https' : 'http'
			};

			// Server sends a flag indicating if file uploads are locked
			// We use it to enable the "Manage SSL certificate" button
			this._sslLocked = data.getBool('lock');

			if (!this._sslLocked)
				$('#src-manageSslWarn').hide();

			// Request configuration data to server instance
			this.sendExtensionRequest(this.REQ_GET_CONFIG);
		}

		// Server configuration data received
		else if (command == this.RESP_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'src-tabNavigator', false);

			// Enable buttons
			this._enableButtons(true);

			// Initialize TabNavigator-ralated widgets
			if (!this._tabNavInitialized)
			{
				// Enable scrolling tabs
				$('#src-tabNavigator > #tabs').scrollingTabs({
					bootstrapVersion: 4,
					scrollToTabEdge: true,
					enableSwiping: true,
					disableScrollArrowsOnFullyScrolled: true,
					cssClassLeftArrow: 'fa fa-chevron-left',
					cssClassRightArrow: 'fa fa-chevron-right'
				});

				this._tabNavInitialized = true;
			}

			// Run validation (to remove validation messages if data was reloaded)
			this._interfaceBuilder.checkIsValid();

			this._switchView('src-main');
		}

		// Server configuration update confirmation
		else if (command == this.RESP_CONFIG_UPDATE_CONFIRM)
		{
			// Enable buttons
			this._enableButtons(true);

			// Enable form items
			this._interfaceBuilder.disableInterface(false);

			// If the current user is the updater, show a notification
			// Otherwise, show a dialog box suggesting to reload
			let updater = data.getUtfString('user');

			if (updater == this.smartFox.mySelf.name)
			{
				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();

				// Display notification
				this.shellCtrl.showNotification('Server settings updated', 'Changes will be applied on next server restart');
			}
			else
			{
				// Show alert
				this.shellCtrl.showSimpleAlert(`Administrator ${updater} has modified the server settings; please reload to update your view.`);

				// Disable submit button
				$('#src-submitButton').attr('disabled', true);
			}
		}

		// Server configuration xml saved by an external process
		else if (command == this.RESP_CONFIG_CHANGED_ALERT)
		{
			// Show alert
			this.shellCtrl.showSimpleAlert(`The system has modified the server settings automatically; please reload to update your view.`);

			// Disable submit button
			$('#src-submitButton').attr('disabled', true);
		}

		// SSL certificate upload error
		else if (command == this.RESP_SSL_UPLOAD_ERROR)
		{
			const error = data.getUtfString('error');

			// Log warning
			this.shellCtrl.logMessage(error, 'error');

			// Show error in manager window
			this._sslCertManager.onSslCertUploadError(error);
		}

		// SSL certificate upload confirmed
		else if (command == this.RESP_SSL_UPLOAD_CONFIRM)
		{
			// Closw manager window
			this._sslCertManager.onSslCertUploadSuccess();

			let updater = data.getUtfString('user');

			// Display notification
			if (updater == this.smartFox.mySelf.name)
				this.shellCtrl.showNotification('SSL certificate', 'SSL certificate keystore was uploaded successfully');
			else
				this.shellCtrl.showNotification('SSL certificate', `Administrator ${updater} has uploaded a new SSL certificate keystore`);

			// When a certificate is uploaded, HTTPS is also enabled automatically:
			// we have to update the interface accordingly
			this._updateConfigFormItemDisplayedValue('webServer.enableHttps', true);
		}

		// Geolocation database update confirmation
		else if (command == this.RESP_UPDATE_GEO_DB)
		{
			// Enable button
			$('#src-updateGeolocDbButton').attr('disabled', false);

			// Check success
			if (data.getBool('success'))
			{
				// Update displayed date
				this._updateConfigFormItemDisplayedValue('adminHelper.geoDbReleaseDate', data.getUtfString('newRelDate'));

				// If the current user is the updater, also show a notification
				let updater = data.getUtfString('user');

				if (updater == this.smartFox.mySelf.name)
					this.shellCtrl.showNotification('Geolocation database updated', 'Latest release of the GeoLite2 Country database has been installed successfully');
			}
			else
			{
				// Show alert
				this.shellCtrl.showSimpleAlert(data.getUtfString('error'));
			}
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_enableButtons(enabled)
	{
		$('#src-reloadButton').attr('disabled', !enabled);
		$('#src-submitButton').attr('disabled', !enabled);
		$('#src-backupCheck').attr('disabled', !enabled);

		$('#src-updateGeolocDbButton').attr('disabled', !enabled);

		if (!this._sslLocked)
			this._sslCertManager.enabled = enabled;
	}

	_switchView(viewId)
	{
		document.getElementById('src-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#src-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();
	}

	_onUpdateGeolocDbClick()
	{
		// Disable button
		$('#src-updateGeolocDbButton').attr('disabled', true);

		// Send request to server
		this.sendExtensionRequest(this.REQ_UPDATE_GEO_DB);
	}

	_onReloadClick()
	{
		// Disable buttons
		this._enableButtons(false);

		// Switch to loading view
		this._switchView('src-loading');

		// Hide validation messages
		this._interfaceBuilder.resetValidation();

		// Request configuration data to server instance
		this.sendExtensionRequest(this.REQ_GET_CONFIG);
	}

	_onSubmitClick()
	{
		// Check validity
		if (this._interfaceBuilder.checkIsValid())
		{
			let changes = this._interfaceBuilder.getChangedData();

			if (changes.size() > 0)
			{
				// Disable buttons
				this._enableButtons(false);

				// Disable form items
				this._interfaceBuilder.disableInterface(true);

				// Send updated settings to server instance
				let params = new SFS2X.SFSObject();
				params.putSFSArray('settings', changes);
				params.putBool('backup', $('#src-backupCheck').prop('checked'));

				this.sendExtensionRequest(this.REQ_UPDATE_CONFIG, params);
			}
		}
		else
			this.shellCtrl.showSimpleAlert('Unable to submit configuration changes due to an invalid value; please verify the highlighted form fields in all tabs.', true);
	}

	_updateConfigFormItemDisplayedValue(configParamName, newValue)
	{
		// Get the relevant Configuration Form Item
		const configFormItem = this._interfaceBuilder.getConfigFormItem(configParamName);

		// Update Configuration Parameter associated with the Configuration Form Item
		configFormItem.data.value = newValue;
		configFormItem.data.resetIsModified(); // This is needed to avoid the Configuration Parameter to flagged as 'changed'

		// Display the new value of the Configuration Form Item
		configFormItem._setWidgetValue(); // Display the new value in the config form item
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtOS5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL21vZHVsZS1zcGVjaWZpYy9zc2wtY2VydGlmaWNhdGUtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL3NlcnZlci1jb25maWd1cmF0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtieXRlc1RvU2l6ZX0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbGl0aWVzJztcbmltcG9ydCBhZXNqcyBmcm9tICdhZXMtanMnO1xuXG5leHBvcnQgY2xhc3MgU3NsQ2VydGlmaWNhdGVNYW5hZ2VyIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0dGhpcy5fbW9kYWxIdG1sID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsXCIgaWQ9XCJ1cGxvYWRNb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwidXBsb2FkTW9kYWxUaXRsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZFwiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlIHRleHQtcHJpbWFyeVwiIGlkPVwidXBsb2FkTW9kYWxUaXRsZVwiPlNTTCBDZXJ0aWZpY2F0ZSBNYW5hZ2VyPC9oNT5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGluLWZsb3ctaW52YWxpZC1tc2dcIj5cblx0XHRcdFx0XHRcdFx0PGZpZWxkc2V0IGlkPVwidXBsb2FkRmllbGRzZXRcIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGlkPVwidXBsb2FkZXJTdWJmb3JtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwidXBsb2FkZXJcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5DZXJ0aWZpY2F0ZSBrZXlzdG9yZSAoamtzKSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCJTU0wgY2VydGlmaWNhdGUncyBwcm90ZWN0ZWQga2V5c3RvcmUgZmlsZSB0byBiZSB1cGxvYWRlZCB0byB0aGUgc2VydmVyLCBpbiBqa3MgZm9ybWF0XCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJ1cGxvYWRlclwiIG5hbWU9XCJ1cGxvYWRlclwiIGFjY2VwdD1cIi5qa3NcIiBkYXRhLXVwbG9hZC1tc2c9XCJTZWxlY3QgYSBmaWxlXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnIHBvc2l0aW9uLXN0YXRpY1wiIGRhdGEtZm9yPVwidXBsb2FkZXJcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBpZD1cInBhc3N3b3Jkc1N1YmZvcm1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2xcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJrc1Bhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+S2V5c3RvcmUgcGFzc3dvcmQgPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiUGFzc3dvcmQgdXNlZCB0byBwcm90ZWN0IHRoZSBjZXJ0aWZpY2F0ZSBrZXlzdG9yZVwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cImtzUGFzc3dvcmRcIiBuYW1lPVwia3NQYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGstdGV4dGJveFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlcXVpcmVkIGRhdGEtcmVxdWlyZWQtbXNnPVwiUmVxdWlyZWRcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnIHBvc2l0aW9uLXN0YXRpY1wiIGRhdGEtZm9yPVwia3NQYXNzd29yZFwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29uZmlybUtzUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5Db25maXJtIHBhc3N3b3JkIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIktleXN0b3JlIHBhc3N3b3JkIGNvbmZpcm1hdGlvblwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cImNvbmZpcm1Lc1Bhc3N3b3JkXCIgbmFtZT1cImNvbmZpcm1Lc1Bhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgay10ZXh0Ym94XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVxdWlyZWQgZGF0YS1yZXF1aXJlZC1tc2c9XCJSZXF1aXJlZFwiIC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJjb25maXJtS3NQYXNzd29yZFwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0XHRcdFx0PHA+PGVtPkZvciBhZGRpdGlvbmFsIHNlY3VyaXR5LCBlbnRlciBhZ2FpbiBhbmQgY29uZmlybSB5b3VyIFNGUzJYIGFkbWluaXN0cmF0aW9uIHBhc3N3b3JkLjwvZW0+PC9wPlxuXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiYWRtaW5QYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkFkbWluIHBhc3N3b3JkIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIlNtYXJ0Rm94U2VydmVyIDJYIHJlbW90ZSBhZG1pbmlzdHJhdGlvbiBwYXNzd29yZFwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cImFkbWluUGFzc3dvcmRcIiBuYW1lPVwiYWRtaW5QYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGstdGV4dGJveFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlcXVpcmVkIGRhdGEtcmVxdWlyZWQtbXNnPVwiUmVxdWlyZWRcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnIHBvc2l0aW9uLXN0YXRpY1wiIGRhdGEtZm9yPVwiYWRtaW5QYXNzd29yZFwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29uZmlybUFkbWluUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5Db25maXJtIHBhc3N3b3JkIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIlNtYXJ0Rm94U2VydmVyIDJYIHJlbW90ZSBhZG1pbmlzdHJhdGlvbiBwYXNzd29yZCBjb25maXJtYXRpb25cIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJjb25maXJtQWRtaW5QYXNzd29yZFwiIG5hbWU9XCJjb25maXJtQWRtaW5QYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGstdGV4dGJveFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlcXVpcmVkIGRhdGEtcmVxdWlyZWQtbXNnPVwiUmVxdWlyZWRcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnIHBvc2l0aW9uLXN0YXRpY1wiIGRhdGEtZm9yPVwiY29uZmlybUFkbWluUGFzc3dvcmRcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgZmxleC1jb2x1bW5cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMSB0ZXh0LWxlZnRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gaWQ9XCJ1cGxvYWRTc2xCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnlcIj48aSBjbGFzcz1cImZhcyBmYS11cGxvYWQgbXItMVwiPjwvaT5VcGxvYWQgY2VydGlmaWNhdGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxpIGlkPVwidXBsb2FkU3Bpbm5lclwiIGNsYXNzPVwiZmFzIGZhLWNpcmNsZS1ub3RjaCBmYS1zcGluIHRleHQtcHJpbWFyeSBhbGlnbi1taWRkbGUgbWwtMVwiPjwvaT5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleC1ncm93LTEgdGV4dC1yaWdodFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGlkPVwidXBsb2FkRXJyb3JNc2dcIiBjbGFzcz1cInRleHQtZGFuZ2VyIG10LTNcIj48L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdCQodGhpcykuYXBwZW5kKGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtc20tNSBjb2wtbGctNCBjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCI+VXBsb2FkIGNlcnRpZmljYXRlIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIlVwbG9hZCBhbiBTU0wgY2VydGlmaWNhdGUncyBwcm90ZWN0ZWQga2V5c3RvcmUgdG8gdGhlIHNlcnZlclwiPjwvaT48L2xhYmVsPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0IGFsaWduLXNlbGYtY2VudGVyIGFsaWduLXNlbGYtc20tc3RhcnQgY29sLWF1dG9cIj5cblx0XHRcdFx0PGJ1dHRvbiBpZD1cIm1hbmFnZVNzbEJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstcHJpbWFyeVwiIGRpc2FibGVkPjxpIGNsYXNzPVwiZmFzIGZhLWNvZyBtci0xXCI+PC9pPk1hbmFnZTwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0YCk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXJzIHRvIE1hbmFnZSBidXR0b24gY2xpY2tcblx0XHQkKCcjbWFuYWdlU3NsQnV0dG9uJywgJCh0aGlzKSkub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbk1hbmFnZVNzbENsaWNrLCB0aGlzKSk7XG5cdH1cblxuXHRkZXN0cm95KClcblx0e1xuXHRcdC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lclxuXHRcdCQoJyNtYW5hZ2VTc2xCdXR0b24nLCAkKHRoaXMpKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHQvLyBIaWRlIG1vZGFsICh3aGljaCBpbiB0dXJuIGRlc3Ryb3lzIGl0KVxuXHRcdGxldCBtb2RhbEVsZW1lbnQgPSAkKCcjdXBsb2FkTW9kYWwnLCAkKHRoaXMpKTtcblxuXHRcdGlmIChtb2RhbEVsZW1lbnQpXG5cdFx0XHRtb2RhbEVsZW1lbnQubW9kYWwoJ2hpZGUnKTtcblx0fVxuXG5cdGdldCBlbmFibGVkKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pc0VuYWJsZWQ7XG5cdH1cblxuXHRzZXQgZW5hYmxlZCh2YWx1ZSlcblx0e1xuXHRcdHRoaXMuX2lzRW5hYmxlZCA9IHZhbHVlO1xuXG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgTWFuYWdlIGJ1dHRvblxuXHRcdCQoJyNtYW5hZ2VTc2xCdXR0b24nLCAkKHRoaXMpKS5hdHRyKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSBtb2RhbFxuXHRcdGxldCBtb2RhbEVsZW1lbnQgPSAkKCcjdXBsb2FkTW9kYWwnLCAkKHRoaXMpKTtcblxuXHRcdGlmIChtb2RhbEVsZW1lbnQpXG5cdFx0e1xuXHRcdFx0Ly8gRGlzYWJsZSBtb2RhbCBjbG9zZSBidXR0b25zXG5cdFx0XHQkKCdidXR0b25bZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLCBtb2RhbEVsZW1lbnQpLmF0dHIoJ2Rpc2FibGVkJywgIXZhbHVlKTtcblxuXHRcdFx0Ly8gRGlzYWJsZSB1cGxvYWQgYnV0dG9uXG5cdFx0XHQkKCcjdXBsb2FkU3NsQnV0dG9uJywgbW9kYWxFbGVtZW50KS5hdHRyKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG5cblx0XHRcdC8vIERpc2FibGUgZmllbGRzZXRcblx0XHRcdCQoJyN1cGxvYWRGaWVsZHNldCcsIG1vZGFsRWxlbWVudCkuYXR0cignZGlzYWJsZWQnLCAhdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGdldCB1cGxvYWRUYXJnZXRDb25maWcoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZztcblx0fVxuXG5cdHNldCB1cGxvYWRUYXJnZXRDb25maWcoZGF0YSlcblx0e1xuXHRcdHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZyA9IGRhdGE7XG5cdH1cblxuXHRfb25NYW5hZ2VTc2xDbGljaygpXG5cdHtcblx0XHQvLyBJbml0aWFsaXplIGFuZCBzaG93IG1vZGFsXG5cdFx0dGhpcy5fc2hvd01vZGFsKCk7XG5cdH1cblxuXHRfb25VcGxvYWRTc2xDbGljaygpXG5cdHtcblx0XHRpZiAodGhpcy5fdmFsaWRhdGUoKSlcblx0XHRcdHRoaXMuX3N0YXJ0U3NsQ2VydFVwbG9hZCgpO1xuXHR9XG5cblx0X3Nob3dNb2RhbCgpXG5cdHtcblx0XHQvLyBBcHBlbmQgbW9kYWwgaHRtbFxuXHRcdCQodGhpcykuYXBwZW5kKHRoaXMuX21vZGFsSHRtbCk7XG5cblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHQvLyBIaWRlIFNTTCBjZXJ0aWZpY2F0ZSB1cGxvYWQgc3Bpbm5lciBhbmQgZXJyb3IgbWVzc2FnZSBjb250YWluZXJcblx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXHRcdCQoJyN1cGxvYWRFcnJvck1zZycsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXHRcdCQoJyN1cGxvYWRFcnJvck1zZycsIG1vZGFsRWxlbWVudCkudGV4dCgnJyk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gVXBsb2FkIGJ1dHRvbiBjbGlja1xuXHRcdCQoJyN1cGxvYWRTc2xCdXR0b24nLCBtb2RhbEVsZW1lbnQpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25VcGxvYWRTc2xDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIG1vZGFsIGhpZGUgZXZlbnRcblx0XHRtb2RhbEVsZW1lbnQub24oJ2hpZGRlbi5icy5tb2RhbCcsICQucHJveHkodGhpcy5fZGVzdHJveU1vZGFsLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHVwbG9hZGVyXG5cdFx0dGhpcy5fdXBsb2FkV2lkZ2V0ID0gbW9kYWxFbGVtZW50LmZpbmQoJyN1cGxvYWRlcicpLmtlbmRvVXBsb2FkKHtcblx0XHRcdGFsbG93ZWRFeHRlbnNpb25zOiBbJy5qa3MnXSxcblx0XHRcdG11bHRpcGxlOiBmYWxzZSxcblx0XHRcdHRlbXBsYXRlOiBmdW5jdGlvbihkYXRhSXRlbSkge1xuXHRcdFx0XHRkYXRhSXRlbS5ieXRlc1RvU2l6ZSA9IGJ5dGVzVG9TaXplOyAvLyBQYXNzIGJ5dGVzVG9TaXplIHV0aWxpdHkgZnVuY3Rpb24gdG8gdGVtcGxhdGVcblx0XHRcdFx0cmV0dXJuIGtlbmRvLnRlbXBsYXRlKGBcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0nay1wcm9ncmVzcyB3LTEwMCc+PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiXCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstZmlsZS1uYW1lXCIgdGl0bGU9XCIjPW5hbWUjXCI+Iz1uYW1lIzwvc3Bhbj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1maWxlLXNpemVcIj5TaXplOiAjPWJ5dGVzVG9TaXplKHNpemUsIDEsICdCeXRlcycpIzwvc3Bhbj5cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdGApKGRhdGFJdGVtKTtcblx0XHRcdH0sXG5cdCAgICAgICAgbG9jYWxpemF0aW9uOiB7XG5cdCAgICAgICAgICAgIHNlbGVjdDogJ1NlbGVjdCBmaWxlLi4uJ1xuXHQgICAgICAgIH1cbiAgICAgICAgfSkuZGF0YSgna2VuZG9VcGxvYWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdmFsaWRhdGlvbiBvbiB1cGxvYWRlciBzdWJmb3JtXG5cdFx0Ly8gTk9URTogd2UgdXNlIHNlcGFyYXRlIHZhbGlkYXRvcnMgdG8gYmUgYWJsZSB0byBkaXNhYmxlICd2YWxpZGF0ZU9uQmx1cicgb24gdGhlIHVwbG9hZGVyLFxuXHRcdC8vIGJlY2F1c2UgaXQgY2F1c2VzIHRoZSBlcnJvciBtZXNzYWdlIHRvIGFwcGVhciBhcyBzb29uIGFzIHRoZSBcIlNlbGVjdCBmaWxlXCIgYnV0dG9uIGlzIGNsaWNrZWRcblx0XHR0aGlzLl92YWxpZGF0b3IxID0gbW9kYWxFbGVtZW50LmZpbmQoJyN1cGxvYWRlclN1YmZvcm0nKS5rZW5kb1ZhbGlkYXRvcih7XG5cdFx0XHR2YWxpZGF0ZU9uQmx1cjogZmFsc2UsXG5cdFx0XHRydWxlczoge1xuXHRcdFx0XHR1cGxvYWQ6IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0XHRcdFx0bGV0IHZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbdHlwZT1maWxlXScpKVxuXHRcdFx0XHRcdFx0dmFsaWQgPSBpbnB1dC5jbG9zZXN0KCcuay11cGxvYWQnKS5maW5kKCcuay1maWxlJykubGVuZ3RoID4gMDtcblxuXHRcdFx0XHRcdHJldHVybiB2YWxpZDtcblx0ICAgICAgICAgICAgfVxuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvVmFsaWRhdG9yJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHZhbGlkYXRpb24gb24gcGFzc3dvcmRzIHN1YmZvcm1cblx0XHR0aGlzLl92YWxpZGF0b3IyID0gbW9kYWxFbGVtZW50LmZpbmQoJyNwYXNzd29yZHNTdWJmb3JtJykua2VuZG9WYWxpZGF0b3Ioe1xuXHRcdFx0dmFsaWRhdGVPbkJsdXI6IHRydWUsXG5cdFx0XHRydWxlczoge1xuXHRcdFx0XHR2ZXJpZnlLc1Bhc3N3b3JkOiAkLnByb3h5KGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0XHRcdFx0bGV0IHZhbGlkID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tuYW1lPWNvbmZpcm1Lc1Bhc3N3b3JkXScpKVxuXHRcdFx0XHRcdFx0dmFsaWQgPSBpbnB1dC52YWwoKSA9PT0gJCh0aGlzKS5maW5kKCcja3NQYXNzd29yZCcpLnZhbCgpO1xuXHRcdFx0XHRcdHJldHVybiB2YWxpZDtcblx0XHRcdFx0fSwgdGhpcyksXG5cdFx0XHRcdHZlcmlmeUFkbVBhc3N3b3JkOiAkLnByb3h5KGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0XHRcdFx0bGV0IHZhbGlkID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tuYW1lPWNvbmZpcm1BZG1pblBhc3N3b3JkXScpKVxuXHRcdFx0XHRcdFx0dmFsaWQgPSBpbnB1dC52YWwoKSA9PT0gJCh0aGlzKS5maW5kKCcjYWRtaW5QYXNzd29yZCcpLnZhbCgpO1xuXHRcdFx0XHRcdHJldHVybiB2YWxpZDtcblx0XHRcdFx0fSwgdGhpcylcblx0XHRcdH0sXG5cdFx0XHRtZXNzYWdlczoge1xuXHRcdFx0XHR2ZXJpZnlLc1Bhc3N3b3JkOiAnUGFzc3dvcmQgbm90IG1hdGNoaW5nJyxcblx0XHRcdFx0dmVyaWZ5QWRtUGFzc3dvcmQ6ICdQYXNzd29yZCBub3QgbWF0Y2hpbmcnLFxuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvVmFsaWRhdG9yJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGJvb3RzdHJhcCBtb2RhbFxuXHRcdG1vZGFsRWxlbWVudC5tb2RhbCh7XG5cdFx0XHRiYWNrZHJvcDogJ3N0YXRpYycsXG5cdFx0XHRrZXlib2FyZDogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblxuXHRfZGVzdHJveU1vZGFsKClcblx0e1xuXHRcdGxldCBtb2RhbEVsZW1lbnQgPSAkKCcjdXBsb2FkTW9kYWwnLCAkKHRoaXMpKTtcblxuXHRcdGlmIChtb2RhbEVsZW1lbnQpXG5cdFx0e1xuXHRcdFx0Ly8gUmVtb3ZlIGxpc3RlbmVyc1xuXHRcdFx0JCgnI3VwbG9hZFNzbEJ1dHRvbicsIG1vZGFsRWxlbWVudCkub2ZmKCdjbGljaycpO1xuXHRcdFx0bW9kYWxFbGVtZW50Lm9mZignaGlkZGVuLmJzLm1vZGFsJyk7XG5cblx0XHRcdC8vIERlc3Ryb3kgZXZlcnl0aGluZyBLZW5kb1xuXHRcdFx0a2VuZG8uZGVzdHJveShtb2RhbEVsZW1lbnQpO1xuXG5cdFx0XHQvLyBEaXNwb3NlIG1vZGFsXG5cdFx0XHRtb2RhbEVsZW1lbnQubW9kYWwoJ2Rpc3Bvc2UnKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGh0bWxcblx0XHRcdG1vZGFsRWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdG1vZGFsRWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0X3ZhbGlkYXRlKClcblx0e1xuXHRcdGxldCB2YWwxID0gdGhpcy5fdmFsaWRhdG9yMS52YWxpZGF0ZSgpO1xuXHRcdGxldCB2YWwyID0gdGhpcy5fdmFsaWRhdG9yMi52YWxpZGF0ZSgpO1xuXG5cdFx0cmV0dXJuIHZhbDEgJiYgdmFsMjtcblx0fVxuXG5cdF9zdGFydFNzbENlcnRVcGxvYWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl91cGxvYWRUYXJnZXRDb25maWcpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VwbG9hZCB0YXJnZXQgY29uZmlndXJhdGlvbiBub3Qgc2V0Jyk7XG5cblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdGxldCBjZXJ0RGF0YSA9IHt9O1xuXHRcdFx0Y2VydERhdGEuZmlsZSA9IHRoaXMuX3VwbG9hZFdpZGdldC5nZXRGaWxlcygpWzBdO1xuXHRcdFx0Y2VydERhdGEua3NQYXNzd29yZCA9ICQoJyNrc1Bhc3N3b3JkJywgbW9kYWxFbGVtZW50KS52YWwoKTtcblx0XHRcdGNlcnREYXRhLmFkbWluUGFzc3dvcmQgPSAkKCcjYWRtaW5QYXNzd29yZCcsIG1vZGFsRWxlbWVudCkudmFsKCk7XG5cblx0XHRcdC8vIERpc2FibGUgbW9kYWxcblx0XHRcdHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBIaWRlIHByZXZpb3VzIGVycm9yIGFuZCBzaG93IHNwaW5uZXJcblx0XHRcdCQoJyN1cGxvYWRTcGlubmVyJywgbW9kYWxFbGVtZW50KS5zaG93KCk7XG5cdFx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHRcdCQoJyN1cGxvYWRFcnJvck1zZycsIG1vZGFsRWxlbWVudCkudGV4dCgnJyk7XG5cblx0XHRcdC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgSW5pdCBWZWN0b3Jcblx0XHRcdGxldCBybmdWYWx1ZXMgPSBbXTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKylcblx0XHRcdFx0cm5nVmFsdWVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG5cblx0XHRcdGxldCBpdiA9IG5ldyBVaW50OEFycmF5KHJuZ1ZhbHVlcyk7XG5cblx0XHRcdC8vIEdlbmVyYXRlIHNlY3JldCBrZXkgYnkgTUQ1LWVuY29kaW5nIGFkbWluIHBhc3N3b3JkICsgc2Vzc2lvbiB0b2tlblxuXHRcdFx0bGV0IG1kNVBhc3MgPSB0aGlzLl9iaW5hcnlNRDUoY2VydERhdGEuYWRtaW5QYXNzd29yZCArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5zZXNzaW9uVG9rZW4pO1xuXG5cdFx0XHQvLyBFbmNyeXB0IGtleXN0b3JlIHBhc3N3b3JkIHZpYSBBRVMgKDEyOGJpdClcblx0XHRcdGxldCBlbmNyeXB0ZWRQd2QgPSB0aGlzLl9hZXNFbmNyeXB0KGNlcnREYXRhLmtzUGFzc3dvcmQsIG1kNVBhc3MsIGl2KTtcblxuXHRcdFx0Ly8gRW5jb2RlIElWIHVzaW5nIEJhc2U2NFxuXHRcdFx0bGV0IGVuY29kZWRJdiA9IHRoaXMuX2I2NEVuY29kZShpdik7XG5cblx0XHRcdC8vIEVuY29kZSBlbmNyeXB0ZWQgcGFzc3dvcmQgdXNpbmcgQmFzZTY0XG5cdFx0XHRsZXQgZW5jb2RlZFB3ZCA9IHRoaXMuX2I2NEVuY29kZShlbmNyeXB0ZWRQd2QpO1xuXG5cdFx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHRcdC8vIFNldCBwYXJhbWV0ZXJzIHRvIGJlIHNlbnQgd2l0aCB0aGUgY2VydGlmaWNhdGUga2V5c3RvcmUgZmlsZVxuXHRcdFx0Y29uc3QgcGFyYW1zID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRwYXJhbXMuYXBwZW5kKCdmaWxlc1tdJywgY2VydERhdGEuZmlsZS5yYXdGaWxlKTtcblx0XHRcdHBhcmFtcy5hcHBlbmQoJ19faXYnLCBlbmNvZGVkSXYpO1xuXHRcdFx0cGFyYW1zLmFwcGVuZCgnX19wYXNzd29yZCcsIGVuY29kZWRQd2QpO1xuXHRcdFx0cGFyYW1zLmFwcGVuZCgnX19tb2R1bGUnLCB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcubW9kdWxlSWQpO1xuXG5cdFx0XHQvLyBTZXQgZGVzdGluYXRpb24gdXJsXG5cdFx0XHRjb25zdCB1cmwgPSB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcucHJvdG9jb2wgKyAnOi8vJyArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5ob3N0ICsgJzonICsgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLnBvcnQgKyAnL0JsdWVCb3gvU0ZTMlhGaWxlVXBsb2FkP3Nlc3NIYXNoSWQ9JyArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5zZXNzaW9uVG9rZW47XG5cblx0XHRcdC8vIFN0YXJ0IHVwbG9hZFxuXHRcdFx0ZmV0Y2godXJsLCB7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRib2R5OiBwYXJhbXMsXG5cdFx0XHRcdG1vZGU6ICduby1jb3JzJ1xuXHRcdFx0fSkudGhlbigkLnByb3h5KHRoaXMuX29uU3NsQ2VydFVwbG9hZEVuZCwgdGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdF9vblNzbENlcnRVcGxvYWRFbmQocmVzcG9uc2UpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvOiB3ZSBoYXZlIHRvIHdhaXQgdGhlIHVwbG9hZCBwcm9jZXNzIGNvbXBsZXRpb24gdG8gYmUgc2lnbmFsZWQgYnkgdGhlIHNlcnZlciB0aHJvdWdoIHRoZSBkZWRpY2F0ZWQgRXh0ZW5zaW9uIHJlc3BvbnNlXG5cblx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHQvLyBUT0RPIFNob3VsZCB3ZSBoYW5kbGUgdGhpcyByZXNwb25zZSBpbiBzb21lIHdheT8gRm9yIHNvbWUgdW5rbm93biByZWFzb24gd2UgYWx3YXlzIGdldCBvaz1mYWxzZSBhbmQgc3RhdHVzPTBcblx0XHQvL2NvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHRcdC8vY29uc29sZS5sb2cocmVzcG9uc2Uub2spXG5cdFx0Ly9jb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG5cdH1cblxuXHQvKipcblx0ICogTWV0aG9kIGNhbGxlZCBieSBwYXJlbnQgd2hlbiB1cGxvYWQgZmFpbGVkLlxuXHQgKi9cblx0b25Tc2xDZXJ0VXBsb2FkRXJyb3IoZXJyb3IpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIEVuYWJsZSBtb2RhbFxuXHRcdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0Ly8gU2hvdyB1cGxvYWQgZXJyb3Jcblx0XHRcdCQoJyN1cGxvYWRFcnJvck1zZycsIG1vZGFsRWxlbWVudCkuc2hvdygpO1xuXHRcdFx0JCgnI3VwbG9hZEVycm9yTXNnJywgbW9kYWxFbGVtZW50KS50ZXh0KGVycm9yICsgJy4nKTtcblxuXHRcdFx0Ly8gSGlkZSBzcGlubmVyXG5cdFx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNZXRob2QgY2FsbGVkIGJ5IHBhcmVudCB3aGVuIHVwbG9hZCBpcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuXHQgKi9cblx0b25Tc2xDZXJ0VXBsb2FkU3VjY2VzcygpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIEVuYWJsZSBtb2RhbFxuXHRcdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0Ly8gSGlkZSBzcGlubmVyXG5cdFx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXG5cdFx0XHQvLyBIaWRlIG1vZGFsXG5cdFx0XHRtb2RhbEVsZW1lbnQubW9kYWwoJ2hpZGUnKTtcblx0XHR9XG5cdH1cblxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cdC8qXG5cdCAqIFRha2VzIGEgc3RyaW5nIGFuZCByZXR1cm5zIHRoZSBNRDUgYXMgVWludDhBcnJheVxuXHQgKi9cblx0X2JpbmFyeU1ENShzdHIpXG5cdHtcblx0XHRsZXQgTUQ1ID0gbmV3IFNGUzJYLk1ENSgpO1xuXHRcdGxldCBoZXhTdHIgPSBNRDUuaGV4X21kNShzdHIpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2hleEJ5dGVTdHJpbmdUb0J5dGVBcnJheShoZXhTdHIpO1xuXHR9XG5cblx0Lypcblx0ICogSGV4IGJ5dGVzIC0tLT4gQWN0dWFsIGJ5dGVbXSBhcyBVaW50OEFycmF5XG5cdCAqL1xuXHRfaGV4Qnl0ZVN0cmluZ1RvQnl0ZUFycmF5KGhleEJ5dGVTdHJpbmcpXG5cdHtcblx0ICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gTUQ1IGZpeGVkIG91dHB1dCBzaXplXG5cblx0ICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGV4Qnl0ZVN0cmluZy5sZW5ndGg7KVxuXHQgICAge1xuXHQgICAgICAgIGxldCBoZXhCeXRlID0gaGV4Qnl0ZVN0cmluZ1tpKytdICsgaGV4Qnl0ZVN0cmluZ1tpKytdO1xuXHQgICAgICAgIGxldCBieXRlID0gcGFyc2VJbnQoaGV4Qnl0ZSwgMTYpO1xuXG5cdCAgICAgICAgYnl0ZXNbaSAvIDIgLSAxXSA9IGJ5dGU7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBieXRlcztcblx0fVxuXG5cdC8qXG5cdCAqIEVuY3J5cHQgdXNpbmcgQUVTLCBtb2RlIENCQywgUEtDUyM3IHBhZGRpbmdcblx0ICpcblx0ICogdGV4dCBcdFx0LT4gdGhlIHRleHQgd2Ugd2FudCB0byBlbmNvZGVcblx0ICoga2V5IFx0XHQtPiB0aGUgQUVTIGtleVxuXHQgKiBpdiAgXHRcdC0+IHRoZSBBRVMvQ0JDIGluaXQgdmVjdG9yXG5cdCAqXG5cdCAqIFJldHVybnMgXHQtPiBVaW50OEFycmF5XG5cdCAqL1xuXHRfYWVzRW5jcnlwdCh0ZXh0LCBrZXksIGl2KVxuXHR7XG5cdFx0bGV0IHRleHRCeXRlcyA9IGFlc2pzLnV0aWxzLnV0ZjgudG9CeXRlcyh0ZXh0KTsgXHRcdC8vIEdldCBVVEYtOCBieXRlc1xuXHRcdGxldCBhZXNDQkMgPSBuZXcgYWVzanMuTW9kZU9mT3BlcmF0aW9uLmNiYyhrZXksIGl2KTtcdC8vIEluaXQgQ0JDIG1vZGVcblx0XHR0ZXh0Qnl0ZXMgPSBhZXNqcy5wYWRkaW5nLnBrY3M3LnBhZCh0ZXh0Qnl0ZXMpOyBcdFx0Ly8gUEtDUyM3IHBhZGRpbmdcblxuXHRcdC8vIEVuY3J5cHRcblx0XHRyZXR1cm4gYWVzQ0JDLmVuY3J5cHQodGV4dEJ5dGVzKTtcblx0fVxuXG5cdC8qXG5cdCAqIEVuY29kZSBwYXNzZWQgYnl0ZSBhcnJheSAtLT4gQmFzZTY0IHJlcHJlc2VudGF0aW9uXG5cdCAqIFJldHVybnMgLS0+IHN0cmluZ1xuXHQgKi9cblx0X2I2NEVuY29kZShiYXJyYXkpXG5cdHtcblx0XHRyZXR1cm4gYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJhcnJheSkpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnc3NsLWNlcnRpZmljYXRlLW1hbmFnZXInKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc3NsLWNlcnRpZmljYXRlLW1hbmFnZXInLCBTc2xDZXJ0aWZpY2F0ZU1hbmFnZXIpO1xuIiwiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcbmltcG9ydCB7Q29uZmlnSW50ZXJmYWNlQnVpbGRlcn0gZnJvbSAnLi4vdXRpbHMvdWlidWlsZGVyL2NvbmZpZy1pbnRlcmZhY2UtYnVpbGRlcic7XG5pbXBvcnQge1NzbENlcnRpZmljYXRlTWFuYWdlcn0gZnJvbSAnLi4vY29tcG9uZW50cy9tb2R1bGUtc3BlY2lmaWMvc3NsLWNlcnRpZmljYXRlLW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJDb25maWd1cmF0b3IgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ3NlcnZlckNvbmZpZycpO1xuXG5cdFx0Ly8gT3V0Z29pbmcgcmVxdWVzdHNcblx0XHR0aGlzLlJFUV9JTklUID0gJ2luaXQnO1xuXHRcdHRoaXMuUkVRX0dFVF9DT05GSUcgPSAnZ2V0Q29uZmlnJztcblx0XHR0aGlzLlJFUV9VUERBVEVfQ09ORklHID0gJ3VwZENvbmZpZyc7XG5cdFx0dGhpcy5SRVFfVVBEQVRFX0dFT19EQiA9ICd1cGRHZW9EYic7XG5cblx0XHQvLyBJbmNvbWluZyByZXNwb25zZXNcblx0XHR0aGlzLlJFU1BfSU5JVCA9ICdpbml0Jztcblx0XHR0aGlzLlJFU1BfQ09ORklHID0gJ2NvbmZpZyc7XG5cdFx0dGhpcy5SRVNQX0NPTkZJR19VUERBVEVfQ09ORklSTSA9ICdjb25maWdVcGRhdGUnO1xuXHRcdHRoaXMuUkVTUF9DT05GSUdfQ0hBTkdFRF9BTEVSVCA9ICdjb25maWdBbGVydCc7XG5cdFx0dGhpcy5SRVNQX1NTTF9VUExPQURfRVJST1IgPSAnc3NsVXBsb2FkRXJyb3InO1xuXHRcdHRoaXMuUkVTUF9TU0xfVVBMT0FEX0NPTkZJUk0gPSAnc3NsVXBsb2FkJztcblx0XHR0aGlzLlJFU1BfVVBEQVRFX0dFT19EQiA9ICdnZW9EYlVwZGF0ZSc7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDT01NT04gTU9EVUxFIElOVEVSRkFDRSBNRVRIT0RTXG5cdC8vIFRoaXMgbWVtYmVycyBhcmUgdXNlZCBieSB0aGUgbWFpbiBjb250cm9sbGVyXG5cdC8vIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIG1vZHVsZSdzIGNvbnRyb2xsZXIuXG5cdC8vIFRoaXMgbWV0aG9kcyBvdmVycmlkZSB0aG9zZSBpbiBCYXNlTW9kdWxlIGNsYXNzLlxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBwcm9ncmVzcyBiYXJcblx0XHQkKCcjc3JjLXByb2dyZXNzQmFyJykua2VuZG9Qcm9ncmVzc0Jhcih7XG5cdFx0XHRtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcblx0XHRcdHZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cdFx0Ly8gQ3JlYXRlIGludGVyZmFjZSBidWlsZGVyIGluc3RhbmNlXG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlciA9IG5ldyBDb25maWdJbnRlcmZhY2VCdWlsZGVyKCk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gR2VvTGl0ZTIgZGF0YWJhc2UgdXBkYXRlIGJ1dHRvblxuXHRcdCQoJyNzcmMtdXBkYXRlR2VvbG9jRGJCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uVXBkYXRlR2VvbG9jRGJDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGludGVyZmFjZSBidXR0b25zXG5cdFx0JCgnI3NyYy1yZWxvYWRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25TdWJtaXRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gU2F2ZSByZWYgdG8gU1NMIE1hbmFnZXJcblx0XHR0aGlzLl9zc2xDZXJ0TWFuYWdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcmMtc3NsQ2VydE1hbmFnZXInKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Ly8gU2VuZCBpbml0aWFsaXphdGlvbiByZXF1ZXN0XG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9JTklUKTtcblx0fVxuXG5cdGRlc3Ryb3koKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5kZXN0cm95KCk7XG5cblx0XHQvLyBEZXN0cm95IFNTTCBDZXJ0aWZpY2F0ZSBNYW5hZ2VyXG5cdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIuZGVzdHJveSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGludGVyZmFjZSBidXR0b25zIGNsaWNrIGxpc3RlbmVyc1xuXHRcdCQoJyNzcmMtdXBkYXRlR2VvbG9jRGJCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3NyYy1yZWxvYWRCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3NyYy1zdWJtaXRCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHQvLyBDbGVhciB0YWJzIGNvbnRhaW5lclxuXHRcdHRoaXMuX2NsZWFyVGFicygpO1xuXHR9XG5cblx0b25FeHRlbnNpb25Db21tYW5kKGNvbW1hbmQsIGRhdGEpXG5cdHtcblx0XHQvLyBJbml0aWFsaXphdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0lOSVQpXG5cdFx0e1xuXHRcdFx0Ly8gUmV0cmlldmUgbW9kdWxlIGlkIHNlbnQgYnkgdGhlIHNlcnZlciAocmVxdWlyZWQgYmVjYXVzZSBtdWx0aXBsZSBtb2R1bGVzIHVzZSBmaWxlIHVwbG9hZGluZyBzZXJ2aWNlKVxuXHRcdFx0Y29uc3QgdXBsb2FkTW9kdWxlSWQgPSBkYXRhLmdldFV0ZlN0cmluZygnbW9kSWQnKTtcblxuXHRcdFx0Ly8gU2V0IFNTTCB1cGxvYWQgbWFuYWdlciB0YXJnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIudXBsb2FkVGFyZ2V0Q29uZmlnID0ge1xuXHRcdFx0XHRzZXNzaW9uVG9rZW46IHRoaXMuc21hcnRGb3guc2Vzc2lvblRva2VuLFxuXHRcdFx0XHRob3N0OiB0aGlzLnNtYXJ0Rm94LmNvbmZpZy5ob3N0LFxuXHRcdFx0XHRwb3J0OiB0aGlzLnNtYXJ0Rm94LmNvbmZpZy5wb3J0LFxuXHRcdFx0XHRtb2R1bGVJZDogdXBsb2FkTW9kdWxlSWQsXG5cdFx0XHRcdHByb3RvY29sOiB0aGlzLnNtYXJ0Rm94LmNvbmZpZy51c2VTU0wgPyAnaHR0cHMnIDogJ2h0dHAnXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBTZXJ2ZXIgc2VuZHMgYSBmbGFnIGluZGljYXRpbmcgaWYgZmlsZSB1cGxvYWRzIGFyZSBsb2NrZWRcblx0XHRcdC8vIFdlIHVzZSBpdCB0byBlbmFibGUgdGhlIFwiTWFuYWdlIFNTTCBjZXJ0aWZpY2F0ZVwiIGJ1dHRvblxuXHRcdFx0dGhpcy5fc3NsTG9ja2VkID0gZGF0YS5nZXRCb29sKCdsb2NrJyk7XG5cblx0XHRcdGlmICghdGhpcy5fc3NsTG9ja2VkKVxuXHRcdFx0XHQkKCcjc3JjLW1hbmFnZVNzbFdhcm4nKS5oaWRlKCk7XG5cblx0XHRcdC8vIFJlcXVlc3QgY29uZmlndXJhdGlvbiBkYXRhIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfQ09ORklHKTtcblx0XHR9XG5cblx0XHQvLyBTZXJ2ZXIgY29uZmlndXJhdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfQ09ORklHKVxuXHRcdHtcblx0XHRcdC8vIEJ1aWxkIHVzZXIgaW50ZXJmYWNlIGJhc2VkIG9uIHJlY2VpdmVkIGRhdGFcblx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuYnVpbGRJbnRlcmZhY2UoZGF0YS5nZXRTRlNBcnJheSgnc2V0dGluZ3MnKSwgJ3NyYy10YWJOYXZpZ2F0b3InLCBmYWxzZSk7XG5cblx0XHRcdC8vIEVuYWJsZSBidXR0b25zXG5cdFx0XHR0aGlzLl9lbmFibGVCdXR0b25zKHRydWUpO1xuXG5cdFx0XHQvLyBJbml0aWFsaXplIFRhYk5hdmlnYXRvci1yYWxhdGVkIHdpZGdldHNcblx0XHRcdGlmICghdGhpcy5fdGFiTmF2SW5pdGlhbGl6ZWQpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBzY3JvbGxpbmcgdGFic1xuXHRcdFx0XHQkKCcjc3JjLXRhYk5hdmlnYXRvciA+ICN0YWJzJykuc2Nyb2xsaW5nVGFicyh7XG5cdFx0XHRcdFx0Ym9vdHN0cmFwVmVyc2lvbjogNCxcblx0XHRcdFx0XHRzY3JvbGxUb1RhYkVkZ2U6IHRydWUsXG5cdFx0XHRcdFx0ZW5hYmxlU3dpcGluZzogdHJ1ZSxcblx0XHRcdFx0XHRkaXNhYmxlU2Nyb2xsQXJyb3dzT25GdWxseVNjcm9sbGVkOiB0cnVlLFxuXHRcdFx0XHRcdGNzc0NsYXNzTGVmdEFycm93OiAnZmEgZmEtY2hldnJvbi1sZWZ0Jyxcblx0XHRcdFx0XHRjc3NDbGFzc1JpZ2h0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLXJpZ2h0J1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl90YWJOYXZJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJ1biB2YWxpZGF0aW9uICh0byByZW1vdmUgdmFsaWRhdGlvbiBtZXNzYWdlcyBpZiBkYXRhIHdhcyByZWxvYWRlZClcblx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuY2hlY2tJc1ZhbGlkKCk7XG5cblx0XHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3NyYy1tYWluJyk7XG5cdFx0fVxuXG5cdFx0Ly8gU2VydmVyIGNvbmZpZ3VyYXRpb24gdXBkYXRlIGNvbmZpcm1hdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0NPTkZJR19VUERBVEVfQ09ORklSTSlcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uc1xuXHRcdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyh0cnVlKTtcblxuXHRcdFx0Ly8gRW5hYmxlIGZvcm0gaXRlbXNcblx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGlzYWJsZUludGVyZmFjZShmYWxzZSk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHNob3cgYSBub3RpZmljYXRpb25cblx0XHRcdC8vIE90aGVyd2lzZSwgc2hvdyBhIGRpYWxvZyBib3ggc3VnZ2VzdGluZyB0byByZWxvYWRcblx0XHRcdGxldCB1cGRhdGVyID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdFx0aWYgKHVwZGF0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1NlcnZlciBzZXR0aW5ncyB1cGRhdGVkJywgJ0NoYW5nZXMgd2lsbCBiZSBhcHBsaWVkIG9uIG5leHQgc2VydmVyIHJlc3RhcnQnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYEFkbWluaXN0cmF0b3IgJHt1cGRhdGVyfSBoYXMgbW9kaWZpZWQgdGhlIHNlcnZlciBzZXR0aW5nczsgcGxlYXNlIHJlbG9hZCB0byB1cGRhdGUgeW91ciB2aWV3LmApO1xuXG5cdFx0XHRcdC8vIERpc2FibGUgc3VibWl0IGJ1dHRvblxuXHRcdFx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2VydmVyIGNvbmZpZ3VyYXRpb24geG1sIHNhdmVkIGJ5IGFuIGV4dGVybmFsIHByb2Nlc3Ncblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9DT05GSUdfQ0hBTkdFRF9BTEVSVClcblx0XHR7XG5cdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYFRoZSBzeXN0ZW0gaGFzIG1vZGlmaWVkIHRoZSBzZXJ2ZXIgc2V0dGluZ3MgYXV0b21hdGljYWxseTsgcGxlYXNlIHJlbG9hZCB0byB1cGRhdGUgeW91ciB2aWV3LmApO1xuXG5cdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdCQoJyNzcmMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBTU0wgY2VydGlmaWNhdGUgdXBsb2FkIGVycm9yXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfU1NMX1VQTE9BRF9FUlJPUilcblx0XHR7XG5cdFx0XHRjb25zdCBlcnJvciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpO1xuXG5cdFx0XHQvLyBMb2cgd2FybmluZ1xuXHRcdFx0dGhpcy5zaGVsbEN0cmwubG9nTWVzc2FnZShlcnJvciwgJ2Vycm9yJyk7XG5cblx0XHRcdC8vIFNob3cgZXJyb3IgaW4gbWFuYWdlciB3aW5kb3dcblx0XHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLm9uU3NsQ2VydFVwbG9hZEVycm9yKGVycm9yKTtcblx0XHR9XG5cblx0XHQvLyBTU0wgY2VydGlmaWNhdGUgdXBsb2FkIGNvbmZpcm1lZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1NTTF9VUExPQURfQ09ORklSTSlcblx0XHR7XG5cdFx0XHQvLyBDbG9zdyBtYW5hZ2VyIHdpbmRvd1xuXHRcdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIub25Tc2xDZXJ0VXBsb2FkU3VjY2VzcygpO1xuXG5cdFx0XHRsZXQgdXBkYXRlciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCd1c2VyJyk7XG5cblx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXBkYXRlciA9PSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lKVxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdTU0wgY2VydGlmaWNhdGUnLCAnU1NMIGNlcnRpZmljYXRlIGtleXN0b3JlIHdhcyB1cGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignU1NMIGNlcnRpZmljYXRlJywgYEFkbWluaXN0cmF0b3IgJHt1cGRhdGVyfSBoYXMgdXBsb2FkZWQgYSBuZXcgU1NMIGNlcnRpZmljYXRlIGtleXN0b3JlYCk7XG5cblx0XHRcdC8vIFdoZW4gYSBjZXJ0aWZpY2F0ZSBpcyB1cGxvYWRlZCwgSFRUUFMgaXMgYWxzbyBlbmFibGVkIGF1dG9tYXRpY2FsbHk6XG5cdFx0XHQvLyB3ZSBoYXZlIHRvIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFjY29yZGluZ2x5XG5cdFx0XHR0aGlzLl91cGRhdGVDb25maWdGb3JtSXRlbURpc3BsYXllZFZhbHVlKCd3ZWJTZXJ2ZXIuZW5hYmxlSHR0cHMnLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBHZW9sb2NhdGlvbiBkYXRhYmFzZSB1cGRhdGUgY29uZmlybWF0aW9uXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfVVBEQVRFX0dFT19EQilcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uXG5cdFx0XHQkKCcjc3JjLXVwZGF0ZUdlb2xvY0RiQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG5cblx0XHRcdC8vIENoZWNrIHN1Y2Nlc3Ncblx0XHRcdGlmIChkYXRhLmdldEJvb2woJ3N1Y2Nlc3MnKSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gVXBkYXRlIGRpc3BsYXllZCBkYXRlXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZUNvbmZpZ0Zvcm1JdGVtRGlzcGxheWVkVmFsdWUoJ2FkbWluSGVscGVyLmdlb0RiUmVsZWFzZURhdGUnLCBkYXRhLmdldFV0ZlN0cmluZygnbmV3UmVsRGF0ZScpKTtcblxuXHRcdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSB1cGRhdGVyLCBhbHNvIHNob3cgYSBub3RpZmljYXRpb25cblx0XHRcdFx0bGV0IHVwZGF0ZXIgPSBkYXRhLmdldFV0ZlN0cmluZygndXNlcicpO1xuXG5cdFx0XHRcdGlmICh1cGRhdGVyID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignR2VvbG9jYXRpb24gZGF0YWJhc2UgdXBkYXRlZCcsICdMYXRlc3QgcmVsZWFzZSBvZiB0aGUgR2VvTGl0ZTIgQ291bnRyeSBkYXRhYmFzZSBoYXMgYmVlbiBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfZW5hYmxlQnV0dG9ucyhlbmFibGVkKVxuXHR7XG5cdFx0JCgnI3NyYy1yZWxvYWRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyNzcmMtYmFja3VwQ2hlY2snKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblxuXHRcdCQoJyNzcmMtdXBkYXRlR2VvbG9jRGJCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblxuXHRcdGlmICghdGhpcy5fc3NsTG9ja2VkKVxuXHRcdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdH1cblxuXHRfc3dpdGNoVmlldyh2aWV3SWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3JjLXZpZXdzdGFjaycpLnNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdJZCk7XG5cdH1cblxuXHRfY2xlYXJUYWJzKClcblx0e1xuXHRcdC8vIERlc3Ryb3kgc2Nyb2xsaW5nIHRhYnNcblx0XHQkKCcjc3JjLXRhYk5hdmlnYXRvciAjdGFicycpLnNjcm9sbGluZ1RhYnMoJ2Rlc3Ryb3knKTtcblxuXHRcdC8vIFJlbW92ZSBhbGwgdGFiIG5hdmlnYXRvciBjb250ZW50XG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5kZXN0cm95SW50ZXJmYWNlKCk7XG5cdH1cblxuXHRfb25VcGRhdGVHZW9sb2NEYkNsaWNrKClcblx0e1xuXHRcdC8vIERpc2FibGUgYnV0dG9uXG5cdFx0JCgnI3NyYy11cGRhdGVHZW9sb2NEYkJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cblx0XHQvLyBTZW5kIHJlcXVlc3QgdG8gc2VydmVyXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9VUERBVEVfR0VPX0RCKTtcblx0fVxuXG5cdF9vblJlbG9hZENsaWNrKClcblx0e1xuXHRcdC8vIERpc2FibGUgYnV0dG9uc1xuXHRcdHRoaXMuX2VuYWJsZUJ1dHRvbnMoZmFsc2UpO1xuXG5cdFx0Ly8gU3dpdGNoIHRvIGxvYWRpbmcgdmlld1xuXHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3NyYy1sb2FkaW5nJyk7XG5cblx0XHQvLyBIaWRlIHZhbGlkYXRpb24gbWVzc2FnZXNcblx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0VmFsaWRhdGlvbigpO1xuXG5cdFx0Ly8gUmVxdWVzdCBjb25maWd1cmF0aW9uIGRhdGEgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfQ09ORklHKTtcblx0fVxuXG5cdF9vblN1Ym1pdENsaWNrKClcblx0e1xuXHRcdC8vIENoZWNrIHZhbGlkaXR5XG5cdFx0aWYgKHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuY2hlY2tJc1ZhbGlkKCkpXG5cdFx0e1xuXHRcdFx0bGV0IGNoYW5nZXMgPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENoYW5nZWREYXRhKCk7XG5cblx0XHRcdGlmIChjaGFuZ2VzLnNpemUoKSA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIERpc2FibGUgYnV0dG9uc1xuXHRcdFx0XHR0aGlzLl9lbmFibGVCdXR0b25zKGZhbHNlKTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIGZvcm0gaXRlbXNcblx0XHRcdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5kaXNhYmxlSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIFNlbmQgdXBkYXRlZCBzZXR0aW5ncyB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHRcdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdFx0cGFyYW1zLnB1dFNGU0FycmF5KCdzZXR0aW5ncycsIGNoYW5nZXMpO1xuXHRcdFx0XHRwYXJhbXMucHV0Qm9vbCgnYmFja3VwJywgJCgnI3NyYy1iYWNrdXBDaGVjaycpLnByb3AoJ2NoZWNrZWQnKSk7XG5cblx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9VUERBVEVfQ09ORklHLCBwYXJhbXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoJ1VuYWJsZSB0byBzdWJtaXQgY29uZmlndXJhdGlvbiBjaGFuZ2VzIGR1ZSB0byBhbiBpbnZhbGlkIHZhbHVlOyBwbGVhc2UgdmVyaWZ5IHRoZSBoaWdobGlnaHRlZCBmb3JtIGZpZWxkcyBpbiBhbGwgdGFicy4nLCB0cnVlKTtcblx0fVxuXG5cdF91cGRhdGVDb25maWdGb3JtSXRlbURpc3BsYXllZFZhbHVlKGNvbmZpZ1BhcmFtTmFtZSwgbmV3VmFsdWUpXG5cdHtcblx0XHQvLyBHZXQgdGhlIHJlbGV2YW50IENvbmZpZ3VyYXRpb24gRm9ybSBJdGVtXG5cdFx0Y29uc3QgY29uZmlnRm9ybUl0ZW0gPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENvbmZpZ0Zvcm1JdGVtKGNvbmZpZ1BhcmFtTmFtZSk7XG5cblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBDb25maWd1cmF0aW9uIEZvcm0gSXRlbVxuXHRcdGNvbmZpZ0Zvcm1JdGVtLmRhdGEudmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRjb25maWdGb3JtSXRlbS5kYXRhLnJlc2V0SXNNb2RpZmllZCgpOyAvLyBUaGlzIGlzIG5lZWRlZCB0byBhdm9pZCB0aGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gZmxhZ2dlZCBhcyAnY2hhbmdlZCdcblxuXHRcdC8vIERpc3BsYXkgdGhlIG5ldyB2YWx1ZSBvZiB0aGUgQ29uZmlndXJhdGlvbiBGb3JtIEl0ZW1cblx0XHRjb25maWdGb3JtSXRlbS5fc2V0V2lkZ2V0VmFsdWUoKTsgLy8gRGlzcGxheSB0aGUgbmV3IHZhbHVlIGluIHRoZSBjb25maWcgZm9ybSBpdGVtXG5cdH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25kQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==