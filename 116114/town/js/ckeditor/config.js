/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	config.toolbar = 'Basic';
	config.toolbar_Basic = [
        ['Source','Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','Styles', 'Font', 'FontSize','JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
	];
	config.height = 300;
	config.resize_enabled = false;
};
