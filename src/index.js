/** @license
 * Kifu for JS
 * Copyright (c) 2014 na2hiro (https://github.com/na2hiro)
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
import Kifu from "./Kifu.js";
import React from "react";
import {render} from "react-dom";
import {ajax} from "./util.js";

export default class KifuController{
	constructor(id){
		if(!id){
			id = "kifuforjs_"+Math.random().toString(36).slice(2);
			document.write("<div id='"+id+"'></div>");
		}
		this.id = id;
	}
	loadKifu(kifu, onReady){
		$(document).ready(() => {
			var container = document.getElementById(this.id);
			render(
				<Kifu kifu={kifu} ImageDirectoryPath={KifuController.settings.ImageDirectoryPath} onReady={onReady}/>,
				container
			);
		});
	}
	changeCallback(callback, onReady){
		$(document).ready(() => {
			var container = document.getElementById(this.id);
			render(
				<Kifu callback={callback} ImageDirectoryPath={KifuController.settings.ImageDirectoryPath} onReady={onReady}/>,
				container
			);
		});
	}
	static loadCallback(callback, id, onReady){
		var controller = new KifuController(id);
		controller.changeCallback(callback, onReady);
		return controller;
	}
	static loadString(kifu, id, onReady){
		var controller = new KifuController(id);
		controller.loadKifu(kifu, onReady);
		return controller;
	}
	static load(filename, id, onReady){
		return KifuController.loadCallback(done => {
			ajax(filename, (data, err) => {
				if(err){
					this.logError(err);
					return;
				}
				done(data, filename);
			});
		}, id, onReady);
	}
}

KifuController.settings = {};

