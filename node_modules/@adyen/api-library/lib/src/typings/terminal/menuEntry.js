"use strict";
/*
 *                       ######
 *                       ######
 * ############    ####( ######  #####. ######  ############   ############
 * #############  #####( ######  #####. ######  #############  #############
 *        ######  #####( ######  #####. ######  #####  ######  #####  ######
 * ###### ######  #####( ######  #####. ######  #####  #####   #####  ######
 * ###### ######  #####( ######  #####. ######  #####          #####  ######
 * #############  #############  #############  #############  #####  ######
 *  ############   ############  #############   ############  #####  ######
 *                                      ######
 *                               #############
 *                               ############
 * Adyen NodeJS API Library
 * Copyright (c) 2021 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEntry = void 0;
class MenuEntry {
    static getAttributeTypeMap() {
        return MenuEntry.attributeTypeMap;
    }
}
exports.MenuEntry = MenuEntry;
MenuEntry.discriminator = undefined;
MenuEntry.attributeTypeMap = [
    {
        "name": "DefaultSelectedFlag",
        "baseName": "DefaultSelectedFlag",
        "type": "boolean"
    },
    {
        "name": "MenuEntryTag",
        "baseName": "MenuEntryTag",
        "type": "MenuEntry.MenuEntryTagEnum"
    },
    {
        "name": "OutputFormat",
        "baseName": "OutputFormat",
        "type": "OutputFormatType"
    },
    {
        "name": "OutputText",
        "baseName": "OutputText",
        "type": "Array<OutputText>"
    },
    {
        "name": "OutputXHTML",
        "baseName": "OutputXHTML",
        "type": "any"
    },
    {
        "name": "PredefinedContent",
        "baseName": "PredefinedContent",
        "type": "PredefinedContent"
    }
];
(function (MenuEntry) {
    let MenuEntryTagEnum;
    (function (MenuEntryTagEnum) {
        MenuEntryTagEnum[MenuEntryTagEnum["NonSelectable"] = 'NonSelectable'] = "NonSelectable";
        MenuEntryTagEnum[MenuEntryTagEnum["NonSelectableSubMenu"] = 'NonSelectableSubMenu'] = "NonSelectableSubMenu";
        MenuEntryTagEnum[MenuEntryTagEnum["Selectable"] = 'Selectable'] = "Selectable";
        MenuEntryTagEnum[MenuEntryTagEnum["SubMenu"] = 'SubMenu'] = "SubMenu";
    })(MenuEntryTagEnum = MenuEntry.MenuEntryTagEnum || (MenuEntry.MenuEntryTagEnum = {}));
})(MenuEntry = exports.MenuEntry || (exports.MenuEntry = {}));
//# sourceMappingURL=menuEntry.js.map