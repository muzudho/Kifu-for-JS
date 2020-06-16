/** @license
 * Kifu for JS
 * Copyright (c) 2014 na2hiro (https://github.com/na2hiro)
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
import * as React from "react";
import { render } from "react-dom";
// import Kifu from "./Kifu";
import * as Kifu from "./Kifu";
import KifuStore from "./stores/KifuStore";
import { onDomReady } from "./utils/util";

export function loadString(kifu: string, id?: string): Promise<KifuStore> {
    return loadCommon(null, kifu, id);
}

export function load(filePath: string, id?: string): Promise<KifuStore> {
    return loadCommon(filePath, null, id);
}

function loadCommon(filePath, kifu, id): Promise<KifuStore> {
    return new Promise((resolve) => {
        if (!id) {
            id =
                "kifuforjs_" +
                Math.random()
                    .toString(36)
                    .slice(2);
            document.write("<div id='" + id + "'></div>");
        }
        onDomReady(() => {
            const container = document.getElementById(id);
            const kifuStore = new KifuStore();
            // render(<Kifu kifuStore={kifuStore} kifu={kifu} filePath={filePath} />, container);
            resolve(kifuStore);
        });
    });
}
