<script context="module">
    import { get, writable } from "svelte/store";
    import Console, { clearConsole, newConsoleEntry } from "./console.svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { css } from '@codemirror/lang-css'
    import {html } from '@codemirror/lang-html'
    import { onMount } from "svelte";
    let output, executing=false, plugins='', loaded=true, consoleNotes=0
    export let JS=writable('console.log("hello world!")');
    export let CSS=writable('p{\nfont-size:10px;\n}');
    export let HTML=writable('<p>Hello world!</p>')
    function injectCss(){
            output.contentDocument.head.innerHTML= '<style>@namespace "http://www.w3.org/1999/xhtml"; html { display: block; } :root { view-transition-name: root; }  body { display: block; margin: 8px; } body:-webkit-full-page-media { background-color: rgb(0, 0, 0) } p { display: block; margin-block-start: 1__qem; margin-block-end: 1__qem; margin-inline-start: 0; margin-inline-end: 0; } div { display: block } article, aside, footer, header, hgroup, main, nav, section { display: block } marquee { display: inline-block; width: -webkit-fill-available; } address { display: block } blockquote { display: block; margin-block-start: 1__qem; margin-block-end: 1em; margin-inline-start: 40px; margin-inline-end: 40px; } figcaption { display: block } figure { display: block; margin-block-start: 1em; margin-block-end: 1em; margin-inline-start: 40px; margin-inline-end: 40px; } q { display: inline } q:before { content: open-quote; } q:after { content: close-quote; } center { display: block;  text-align: -webkit-center } hr { display: block; overflow: hidden; unicode-bidi: isolate; margin-block-start: 0.5em; margin-block-end: 0.5em; margin-inline-start: auto; margin-inline-end: auto; border-style: inset; border-width: 1px } map { display: inline } video { object-fit: contain; } video:-webkit-full-page-media { margin: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-height: 100%; max-width: 100%; } audio:not([controls]) { display: none !important; }  audio { width: 300px; height: 54px; }  h1 { display: block; font-size: 2em; margin-block-start: 0.67__qem; margin-block-end: 0.67em; margin-inline-start: 0; margin-inline-end: 0; font-weight: bold } :-webkit-any(article,aside,nav,section) h1 { font-size: 1.5em; margin-block-start: 0.83__qem; margin-block-end: 0.83em; } :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) h1 { font-size: 1.17em; margin-block-start: 1__qem; margin-block-end: 1em; } :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) h1 { font-size: 1.00em; margin-block-start: 1.33__qem; margin-block-end: 1.33em; } :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) h1 { font-size: .83em; margin-block-start: 1.67__qem; margin-block-end: 1.67em; } :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) :-webkit-any(article,aside,nav,section) h1 { font-size: .67em; margin-block-start: 2.33__qem; margin-block-end: 2.33em; } h2 { display: block; font-size: 1.5em; margin-block-start: 0.83__qem; margin-block-end: 0.83em; margin-inline-start: 0; margin-inline-end: 0; font-weight: bold } h3 { display: block; font-size: 1.17em; margin-block-start: 1__qem; margin-block-end: 1em; margin-inline-start: 0; margin-inline-end: 0; font-weight: bold } h4 { display: block; margin-block-start: 1.33__qem; margin-block-end: 1.33em; margin-inline-start: 0; margin-inline-end: 0; font-weight: bold } h5 { display: block; font-size: .83em; margin-block-start: 1.67__qem; margin-block-end: 1.67em; margin-inline-start: 0; margin-inline-end: 0; font-weight: bold } h6 { display: block; font-size: .67em; margin-block-start: 2.33__qem; margin-block-end: 2.33em; margin-inline-start: 0; margin-inline-end: 0; font-weight: bold }  table { display: table; border-collapse: separate; border-spacing: 2px; border-color: gray; box-sizing: border-box; text-indent: initial } thead { display: table-header-group; vertical-align: middle; border-color: inherit } tbody { display: table-row-group; vertical-align: middle; border-color: inherit } tfoot { display: table-footer-group; vertical-align: middle; border-color: inherit }  table > tr { vertical-align: middle; } col { display: table-column } colgroup { display: table-column-group } tr { display: table-row; vertical-align: inherit; border-color: inherit } td, th { display: table-cell; vertical-align: inherit; }  td:not(table td), th:not(table th) { padding: 1px; } th { font-weight: bold; text-align: -internal-center } caption { display: table-caption; text-align: -webkit-center }  ul, menu, dir { display: block; list-style-type: disc; margin-block-start: 1__qem; margin-block-end: 1em; margin-inline-start: 0; margin-inline-end: 0; padding-inline-start: 40px } ol { display: block; list-style-type: decimal; margin-block-start: 1__qem; margin-block-end: 1em; margin-inline-start: 0; margin-inline-end: 0; padding-inline-start: 40px } li { display: list-item; text-align: -webkit-match-parent; } ul ul, ol ul { list-style-type: circle } ol ol ul, ol ul ul, ul ol ul, ul ul ul { list-style-type: square } dd { display: block; margin-inline-start: 40px } dl { display: block; margin-block-start: 1__qem; margin-block-end: 1em; margin-inline-start: 0; margin-inline-end: 0; } dt { display: block } ol ul, ul ol, ul ul, ol ol { margin-block-start: 0; margin-block-end: 0 }  form { display: block; margin-top: 0__qem; } :-webkit-any(table, thead, tbody, tfoot, tr) > form:-internal-is-html { display: none !important; } label { cursor: default; } legend { display: block; padding-inline-start: 2px; padding-inline-end: 2px; border: none } fieldset { display: block; margin-inline-start: 2px; margin-inline-end: 2px; padding-block-start: 0.35em; padding-inline-start: 0.75em; padding-inline-end: 0.75em; padding-block-end: 0.625em; border: 2px groove #C0C0C0; min-inline-size: min-content; } button { appearance: auto; }  input:not([type="range"]):not([type="color"]), select { writing-mode: horizontal-tb !important; } button:not(::-internal-selectmenu-button) { writing-mode: horizontal-tb !important; } input, div, select, button { margin: 0__qem; font: -webkit-small-control; text-rendering: auto;  color: FieldText; letter-spacing: normal; word-spacing: normal; line-height: normal; text-transform: none; text-indent: 0; text-shadow: none; display: inline-block; text-align: start; } div { appearance: auto; border: 1px solid -internal-light-dark(#767676, #858585); column-count: initial !important; -webkit-rtl-ordering: logical; resize: auto; cursor: text; padding: 2px; white-space: pre-wrap; word-wrap: break-word; background-color: Field; font-family: monospace; } input { appearance: auto; padding:1px 0; border: 2px inset -internal-light-dark(#767676, #858585); -webkit-rtl-ordering: logical; cursor: text; background-color: Field; } input:not([type="file" i], [type="image" i], [type="checkbox" i], [type="radio" i]) { -internal-align-content-block: center; } input[type="search" i] { appearance: auto; box-sizing: border-box; } input::-webkit-textfield-decoration-container { display: flex !important; align-items: center; -webkit-user-modify: read-only !important; content: none !important; writing-mode: inherit !important; -internal-align-self-block: center; } input::-webkit-clear-button { appearance: auto; display: inline-block; cursor: default; flex: none; -webkit-user-modify: read-only !important; margin-inline-start: 2px; opacity: 0; pointer-events: none; } input:enabled:read-write:-webkit-any(:focus,:hover)::-webkit-clear-button { opacity: 1; pointer-events: auto; } input[type="search" i]::-webkit-search-cancel-button { appearance: auto; display: block; cursor: default; flex: none; -webkit-user-modify: read-only !important; margin-inline-start: 1px; margin-right: 3px; opacity: 0; pointer-events: none; user-select: none !important; } input[type="search" i]:enabled:read-write:-webkit-any(:focus,:hover)::-webkit-search-cancel-button { opacity: 1; pointer-events: auto; } input[type="search" i]::-webkit-search-results-decoration { margin: auto 3px auto 2px; } input, input[type="email" i], input[type="number" i], input[type="password" i], input[type="search" i], input[type="tel" i], input[type="text" i], input[type="url" i] { padding: 1px 2px; } input::-webkit-inner-spin-button { appearance: auto; display: inline-block; cursor: default; flex: none; align-self: stretch; -webkit-user-modify: read-only !important; opacity: 0; pointer-events: none; } input:enabled:read-write:-webkit-any(:focus,:hover)::-webkit-inner-spin-button { opacity: 1; pointer-events: auto; } ::-webkit-input-placeholder { -webkit-text-security: none; color: #757575; direction: inherit !important; pointer-events: none !important; text-orientation: inherit !important; writing-mode: inherit !important; } input::-webkit-input-placeholder { text-overflow: inherit; line-height: initial !important; white-space: pre; word-wrap: normal; overflow: hidden; -webkit-user-modify: read-only !important; } input::-internal-input-suggested { text-overflow: inherit; white-space: nowrap; overflow: hidden; } input::-internal-input-suggested, div::-internal-input-suggested { font: -webkit-small-control !important;  font-feature-settings: normal !important;  overflow: hidden !important; overflow-anchor: none; } div::-internal-input-suggested { font-family: monospace !important; } input[type="password" i] { -webkit-text-security: disc !important; } input[type="password" i]::-internal-input-suggested:not(.reveal-password) { -webkit-text-security: disc !important; } input[type="password" i]::-internal-input-suggested.reveal-password { -webkit-text-security: none; } input[type="password" i]::-internal-reveal { width: 1.3em; height: 1.3em; cursor: default; flex: none; background-image: url(images/password_reveal_on.svg); background-repeat: no-repeat; background-position: center; background-size: contain; margin-left: 3px; margin-right: 3px; } input[type="password" i]::-internal-reveal.reveal { background-image: url(images/password_reveal_off.svg); } input[type="password" i]::-internal-reveal:hover, input[type="password" i]::-internal-reveal:focus { border-radius: 1px; cursor: pointer; } input[type="hidden" i], input[type="image" i], input[type="file" i] { appearance: none; padding: initial; background-color: initial; border: initial; cursor: default; } input[type="file" i] { align-items: baseline; color: inherit; overflow: hidden !important; text-align: start !important; text-overflow: ellipsis; white-space: pre; } input[type="image" i] { cursor: pointer; }  input:-internal-autofill-previewed, input:-internal-autofill-selected, div:-internal-autofill-previewed, div:-internal-autofill-selected, select:-internal-autofill-previewed, select:-internal-autofill-selected { appearance: menulist-button; background-image:none !important; background-color: -internal-light-dark(#E8F0FE, rgba(70,90,126,0.4)) !important; color: FieldText !important; } input[type="radio" i], input[type="checkbox" i] { margin:3px 3px 3px 4px; padding: initial; background-color: initial; border: initial; cursor: default; } input[type="radio" i] { margin:3px 3px 0 5px; } input[type="button" i], input[type="submit" i], input[type="reset" i] { -internal-empty-line-height: fabricated; appearance: auto; user-select: none; white-space: pre } input[type="file" i]::-webkit-file-upload-button { appearance: auto; -webkit-user-modify: read-only !important; white-space: nowrap; margin: 0; margin-inline-end: 4px;  font-size: inherit; } input[type="button" i], input[type="submit" i], input[type="reset" i], input[type="file" i]::-webkit-file-upload-button, button { align-items: flex-start; text-align: center; cursor: default; padding: 1px 6px; border: 2px outset ButtonBorder; box-sizing: border-box; background-color: ButtonFace; color: ButtonText; } input[type="checkbox" i]:disabled, input[type="file" i]:disabled, input[type="hidden" i]:disabled, input[type="image" i]:disabled, input[type="radio" i]:disabled, input[type="range" i]:disabled { background-color: initial; } input[type="range" i] { appearance: auto; padding: initial; border: initial; margin: 2px; cursor: default; color: -internal-light-dark(#101010, #ffffff); } input[type="range" i]::-webkit-slider-container, input[type="range" i]::-webkit-media-slider-container { appearance: inherit; flex: 1; min-inline-size: 0; box-sizing: border-box; -webkit-user-modify: read-only !important; display: flex; } input[type="range" i]:-internal-has-datalist::-webkit-slider-container {  min-block-size: 22px; } input[type="range" i]::-webkit-slider-runnable-track { flex: 1; min-inline-size: 0; align-self: center; box-sizing: border-box; -webkit-user-modify: read-only !important; display: block; } input[type="range" i]::-webkit-slider-thumb, input[type="range" i]::-webkit-media-slider-thumb { appearance: auto; box-sizing: border-box; -webkit-user-modify: read-only !important; display: block; } input[type="range" i]:disabled { color: #c5c5c5; } input[type="button" i]:disabled, input[type="submit" i]:disabled, input[type="reset" i]:disabled, input[type="color" i]:disabled, input[type="file" i]:disabled::-webkit-file-upload-button, button:disabled { background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(19, 1, 1, 0.3)); border-color: -internal-light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3)); color: -internal-light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3)); } select:disabled, optgroup:disabled, option:disabled, select[disabled]>option { color: -internal-light-dark(GrayText, #aaa); } input[type="button" i]:active, input[type="submit" i]:active, input[type="reset" i]:active, input[type="file" i]:active::-webkit-file-upload-button, button:active { border-style: inset } input[type="button" i]:active:disabled, input[type="submit" i]:active:disabled, input[type="reset" i]:active:disabled, input[type="file" i]:active:disabled::-webkit-file-upload-button, button:active:disabled { border-style: outset } input:disabled, div:disabled { cursor: default; background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3)); color: -internal-light-dark(#545454, #aaaaaa); } input:disabled, select:disabled, div:disabled { border-color: rgba(118, 118, 118, 0.3); } option:-internal-spatial-navigation-focus { outline: -internal-light-dark(black, white) dashed 1px; outline-offset: -1px; }   area { display: inline; } base, basefont, datalist, head, link, meta, noembed, noframes, param, rp, script, style, template, title { display: none; } input[type="hidden" i] { display: none !important; } area:-webkit-any-link { cursor: pointer; } input[type="checkbox" i] { appearance: auto; box-sizing: border-box; } input[type="radio" i] { appearance: auto; box-sizing: border-box; } input[type="color" i] { appearance: auto; inline-size: 50px; block-size: 24px;  border: 1px solid ButtonBorder; padding: 1px 2px; cursor: default; box-sizing: border-box; background-color: ButtonFace; color: ButtonText; } input[type="color" i]::-webkit-color-swatch-wrapper { display: flex; padding: 4px 2px; box-sizing: border-box; -webkit-user-modify: read-only !important; width: 100%; height: 100% } input[type="color" i]::-webkit-color-swatch {  color-scheme: only light; background-color: #000000; border: 1px solid #777777; flex: 1; min-width: 0; -webkit-user-modify: read-only !important; } input[type="color" i][list] { appearance: auto; inline-size: 94px; block-size: 24px } input[type="color" i][list]::-webkit-color-swatch-wrapper { padding-inline-start: 8px; padding-inline-end: 24px; } input[type="color" i][list]::-webkit-color-swatch { border-color: #000000; } input::-webkit-calendar-picker-indicator { display: inline-block; width: 0.66em; height: 0.66em; padding: 0.17em 0.34em; -webkit-user-modify: read-only !important; opacity: 0; cursor: default; pointer-events: none; } input::-webkit-calendar-picker-indicator:hover { background-color: #eee; } input:enabled:read-write:-webkit-any(:focus,:hover)::-webkit-calendar-picker-indicator, input::-webkit-calendar-picker-indicator:focus { opacity: 1; pointer-events: auto; } input[type="date" i]:disabled::-webkit-clear-button, input[type="date" i]:disabled::-webkit-inner-spin-button, input[type="datetime-local" i]:disabled::-webkit-clear-button, input[type="datetime-local" i]:disabled::-webkit-inner-spin-button, input[type="month" i]:disabled::-webkit-clear-button, input[type="month" i]:disabled::-webkit-inner-spin-button, input[type="week" i]:disabled::-webkit-clear-button, input[type="week" i]:disabled::-webkit-inner-spin-button, input:disabled::-webkit-calendar-picker-indicator, input[type="date" i][readonly]::-webkit-clear-button, input[type="date" i][readonly]::-webkit-inner-spin-button, input[type="datetime-local" i][readonly]::-webkit-clear-button, input[type="datetime-local" i][readonly]::-webkit-inner-spin-button, input[type="month" i][readonly]::-webkit-clear-button, input[type="month" i][readonly]::-webkit-inner-spin-button, input[type="week" i][readonly]::-webkit-clear-button, input[type="week" i][readonly]::-webkit-inner-spin-button, input[readonly]::-webkit-calendar-picker-indicator { visibility: hidden; } select { appearance: auto; box-sizing: border-box; align-items: center; white-space: pre; -webkit-rtl-ordering: logical; color: FieldText; background-color: Field; border: 1px solid -internal-light-dark(#767676, #858585); cursor: default; border-radius: 0; } select:disabled { opacity: 0.7; }   select:-internal-list-box { appearance: auto; align-items: flex-start; overflow-x: hidden; overflow-y: scroll; vertical-align: text-bottom; white-space: nowrap; border-radius: 2px; } select:not(:-internal-list-box) { overflow: visible !important; }  select:-internal-list-box optgroup option { padding-inline-start: 20px; } select:-internal-list-box option, select:-internal-list-box optgroup { line-height: initial !important; }   select:-internal-list-box:focus option:checked, select:-internal-list-box:focus option:checked:hover { background-color: SelectedItem !important; color: SelectedItemText !important; }  select:-internal-list-box:focus option:checked:disabled { background-color: -internal-inactive-list-box-selection !important; }  select:-internal-list-box option:checked, select:-internal-list-box option:checked:hover { background-color: -internal-light-dark(#cecece, #545454); color: -internal-light-dark(#101010, #FFFFFF); } select:-internal-list-box:disabled option:checked, select:-internal-list-box option:checked:disabled, select:-internal-list-box option:checked:disabled:hover { color: -internal-light-dark(gray, #aaa); } select:-internal-list-box hr { border-style: none; margin-block-start: 0.5em; margin-block-end: 0; } select:-internal-list-box:focus-visible option:-internal-multi-select-focus { outline: auto 1px -webkit-focus-ring-color; outline-offset: -1px; } select:-internal-list-box option:hover { background-color: initial; } optgroup { font-weight: bolder; display: block; } option { font-weight: normal; display: block; padding: 0 2px 1px 2px; white-space: nowrap; min-height: 1.2em; } output { display: inline; }  meter { appearance: auto; box-sizing: border-box; display: inline-block; block-size: 1em; inline-size: 5em; vertical-align: -0.2em; -webkit-user-modify: read-only !important; } meter::-webkit-meter-inner-element { appearance: inherit; box-sizing: inherit; display: none; -webkit-user-modify: read-only !important; block-size: 100%; inline-size: 100%; } meter::-webkit-meter-inner-element:-internal-shadow-host-has-appearance { display: grid; grid-template-rows: 1fr [line1] 2fr [line2] 1fr; position: relative; } meter::-internal-fallback:-internal-shadow-host-has-appearance { display: none; } meter::-webkit-meter-bar { block-size: 100%; inline-size: 100%; -webkit-user-modify: read-only !important; background: -internal-light-dark(#efefef, #3B3B3B); border: thin solid -internal-light-dark(rgba(118, 118, 118, 0.3), #858585); grid-row-start: line1; grid-row-end: line2; border-radius: 20px; box-sizing: border-box; align-self: unsafe center; position: absolute; overflow: hidden; } meter::-webkit-meter-optimum-value { block-size: 100%; -webkit-user-modify: read-only !important; box-sizing: border-box; background: -internal-light-dark(#107c10, #74b374) } meter::-webkit-meter-suboptimum-value { block-size: 100%; -webkit-user-modify: read-only !important; box-sizing: border-box; background: -internal-light-dark(#ffb900, #f2c812) } meter::-webkit-meter-even-less-good-value { block-size: 100%; -webkit-user-modify: read-only !important; box-sizing: border-box; background: -internal-light-dark(#d83b01, #e98f6d) }  progress { appearance: auto; box-sizing: border-box; display: inline-block; block-size: 1em; inline-size: 10em; vertical-align: -0.2em; } progress::-webkit-progress-inner-element { box-sizing: inherit; -webkit-user-modify: read-only; block-size: 100%; inline-size: 100%; } progress::-webkit-progress-bar { background-color: gray; block-size: 100%; inline-size: 100%; -webkit-user-modify: read-only !important; box-sizing: border-box; } progress::-webkit-progress-value { background-color: green; block-size: 100%; inline-size: 50%;  -webkit-user-modify: read-only !important; box-sizing: border-box; }  u, ins { text-decoration: underline } abbr[title], acronym[title] { text-decoration: dotted underline; } strong, b { font-weight: bold } i, cite, em, var, address, dfn { font-style: italic } tt, code, kbd, samp { font-family: monospace } pre, xmp, plaintext, listing { display: block; font-family: monospace; white-space: pre; margin: 1__qem 0 } mark { background-color: Mark; color: MarkText; } big { font-size: larger } small { font-size: smaller } s, strike, del { text-decoration: line-through } sub { vertical-align: sub; font-size: smaller } sup { vertical-align: super; font-size: smaller } nobr { white-space: nowrap }  :-internal-selector-fragment-anchor { outline: Highlight 3px solid; } :-internal-spatial-navigation-interest { outline: auto 1px -webkit-focus-ring-color !important; box-shadow: none !important } :focus-visible { outline: auto 1px -webkit-focus-ring-color } html:focus-visible, body:focus-visible { outline: none } embed:focus-visible, iframe:focus-visible, object:focus-visible { outline: none } input:focus-visible, div:focus-visible, select:focus-visible { outline-offset: 0; } input[type="button" i]:focus-visible, input[type="file" i]:focus-visible, input[type="hidden" i]:focus-visible, input[type="image" i]:focus-visible, input[type="reset" i]:focus-visible, input[type="submit" i]:focus-visible, input[type="file" i]:focus-visible::-webkit-file-upload-button { outline-offset: 0 } input[type="checkbox" i]:focus-visible, input[type="radio" i]:focus-visible { outline-offset: 2px; } input[type="date" i]::-webkit-calendar-picker-indicator, input[type="datetime-local" i]::-webkit-calendar-picker-indicator, input[type="month" i]::-webkit-calendar-picker-indicator, input[type="week" i]::-webkit-calendar-picker-indicator { background-image: -internal-light-dark(url(images/calendar_icon.svg), url(images/calendar_icon_white.svg)); background-origin: content-box; background-repeat: no-repeat; background-size: contain; height: 1.0em; width: 1.0em; opacity: 1; outline: none; padding: 2px; } input[type="date" i]::-webkit-calendar-picker-indicator:focus-visible, input[type="datetime-local" i]::-webkit-calendar-picker-indicator:focus-visible, input[type="month" i]::-webkit-calendar-picker-indicator:focus-visible, input[type="week" i]::-webkit-calendar-picker-indicator:focus-visible { outline: solid 2px -webkit-focus-ring-color; outline-offset: -2px; } input[type="time" i]::-webkit-calendar-picker-indicator { background-image: -internal-light-dark(url(images/time_icon.svg), url(images/time_icon_white.svg)); background-origin: content-box; background-repeat: no-repeat; background-size: contain; height: 1.05em; margin-inline-start: 8px; opacity: 1; outline: none; padding-bottom: 3px; padding-inline-start: 3px; padding-inline-end: 3px; padding-top: 3px; width: 1.05em; } input[type="time" i]::-webkit-calendar-picker-indicator:focus-visible { outline: solid 2px -webkit-focus-ring-color; outline-offset: -2px; } input::-webkit-calendar-picker-indicator:hover { background-color: initial; } input::-webkit-datetime-edit-ampm-field:focus, input::-webkit-datetime-edit-day-field:focus, input::-webkit-datetime-edit-hour-field:focus, input::-webkit-datetime-edit-millisecond-field:focus, input::-webkit-datetime-edit-minute-field:focus, input::-webkit-datetime-edit-month-field:focus, input::-webkit-datetime-edit-second-field:focus, input::-webkit-datetime-edit-week-field:focus, input::-webkit-datetime-edit-year-field:focus { background-color: -internal-light-dark(highlight, #99C8FF); color: -internal-light-dark(highlighttext, #000000); outline: none; } input::-webkit-datetime-edit-year-field[disabled], input::-webkit-datetime-edit-month-field[disabled], input::-webkit-datetime-edit-week-field[disabled], input::-webkit-datetime-edit-day-field[disabled], input::-webkit-datetime-edit-ampm-field[disabled], input::-webkit-datetime-edit-hour-field[disabled], input::-webkit-datetime-edit-millisecond-field[disabled], input::-webkit-datetime-edit-minute-field[disabled], input::-webkit-datetime-edit-second-field[disabled] { color: -internal-light-dark(GrayText, rgb(165, 165, 165)); } a:-webkit-any-link { color: -webkit-link; text-decoration: underline; cursor: pointer; } a:-webkit-any-link:active { color: -webkit-activelink } a:-webkit-any-link:read-write { cursor: text; } a:-webkit-any-link:focus-visible { outline-offset: 1px; }  ruby, rt { text-indent: 0;  } rt { line-height: normal; text-emphasis: none; } ruby > rt { display: block; font-size: 50%; text-align: start; }  frameset, frame { display: block } frameset { border-color: inherit } iframe { border: 2px inset } fencedframe { border: 2px inset; object-fit: contain !important; object-position: 50% 50% !important; } details { display: block } summary { display: block }  details > summary:first-of-type { display: list-item; counter-increment: list-item 0; list-style: disclosure-closed inside; } details[open] > summary:first-of-type { list-style-type: disclosure-open; } bdi, output { unicode-bidi: isolate; } bdo { unicode-bidi: bidi-override; } div[dir=auto i] { unicode-bidi: plaintext; } dialog { display: none;  position: absolute; inset-inline-start: 0; inset-inline-end: 0; width: fit-content; height: fit-content; margin: auto; border: solid; padding: 1em; background-color: Canvas; color: CanvasText; } dialog[open] { display: block; } dialog:modal {  position: fixed; overflow: auto; inset-block-start: 0; inset-block-end: 0; max-width: calc(100% - 6px - 2em); max-height: calc(100% - 6px - 2em);  user-select: text; visibility: visible; overlay: auto !important; }  dialog::backdrop { position: fixed; inset: 0;  background: rgba(0,0,0,0.1); } slot { display: contents; }  @page {  size: auto; margin: auto; padding: 0px; border-width: 0px; }  @media print { thead { break-inside:avoid; } tfoot { break-inside:avoid; } }  html::spelling-error { text-decoration: -internal-spelling-error-color spelling-error; } html::grammar-error { text-decoration: -internal-grammar-error-color grammar-error; }</style>'

    }
    function refreshExecution(){
        output = document.getElementById("output");
        var clone = output.cloneNode(true);
        output.parentNode.replaceChild(clone, output)
        output = clone
        executing = true
    }
    export async function updatePreview(){
        consoleNotes=0
        let checker = get(JS).replaceAll(' ', '').replaceAll('\n', '')
        refreshExecution()
        injectCss()
        clearConsole()
        let html = '<html>' + get(HTML) + '</html><style>' + get(CSS) + '</style>'
        output.contentDocument.body.innerHTML = html;
        output.contentWindow.console = {
            log: function() {
                for (var i = 0; i < arguments.length; i++) {
                logInConsole(arguments[i], 'white')
                }            },
            clear: function(){
                clearConsole()    
                consoleNotes=0        
            },
            info: function(){
                for (var i = 0; i < arguments.length; i++) {
                logInConsole(arguments[i], 'green')
                }            }, 
            warn: function(){
                for (var i = 0; i < arguments.length; i++) {
                logInConsole(arguments[i], 'orange')
                }            },
            error: function(){
                for (var i = 0; i < arguments.length; i++) {
                logInConsole(arguments[i], 'red')
                }
            },
            link: function(){
                for (var i = 0; i < arguments.length-1; i+=2) {
                logInConsole(arguments[i], 'lightblue', arguments[i+1])
                }
            },
            html: function(){
                for (var i = 0; i < arguments.length; i++) {
                    logInConsole('', '', '', arguments[i])
                };
            }
        }
        output.contentWindow.removeEventListener('error', throwError);

        try{
            output.contentWindow.eval(plugins)
            output.contentWindow.eval(get(JS))
            setTimeout(function(){output.contentWindow.stop()}, 1000)
            output.contentWindow.addEventListener('error', throwError);
        }catch(e){
            throwError(e)
        }
}
function throwError(e){
    if(e.lineno){
    logInConsole('', 'red', `https://stackoverflow.com/search?q=${e.message.split(':')[1]}`, e.message.split(':')[0]+ ': ' + e.message.split(':')[1] + '<br>at line number: ' + e.lineno + ' column number: ' + e.colno)
    }else{
        logInConsole('', 'red', `https://stackoverflow.com/search?q=${(e.stack.split(':')[0]+ ': ' + e.stack.split(':')[1].split('at')[0]).replace(/\n/, '').replaceAll('(', '').replaceAll(')', '')}`, (e.stack.split(':')[0]+ ':' + e.stack.split(':')[1].split('at')[0] + '<br>line number: ' + e.stack.split('\n')[1].split(',')[1].split(':')[1] + ', column number: ' + e.stack.split('\n')[1].split(',')[1].split(':')[2]).replace(/\n/, '').replaceAll('(', '').replaceAll(')', ''))
    }
}
function logInConsole(a, b, c, d){
    consoleNotes++
    newConsoleEntry(a,b,c,d)
}
</script>
{#if loaded}
<div class="container">
    <button on:click={updatePreview} class="run">run</button>
    <div class="left">
        <div class="tabs">
            <input type="radio" name="tabs" id="tabone" checked="checked">
            <label for="tabone">HTML</label>
            <div class="tab code">
                <CodeMirror lang={html()} on:change={function(e){HTML.set(e.detail)}} value={$HTML}/>
            </div>
            <input type="radio" name="tabs" id="tabtwo">
            <label for="tabtwo">CSS</label>
            <div class="tab code">
                <CodeMirror lang={css()} on:change={function(e){CSS.set(e.detail)}} value={$CSS}/>
            </div>
            <input type="radio" name="tabs" id="tabthree">
            <label for="tabthree">JS</label>
            <div class="tab code">
                <CodeMirror lang={javascript()} on:change={function(e){JS.set(e.detail)}} value={$JS}/>
            </div>
            <input type="radio" name="tabs" id="tabfour" on:click={function(){consoleNotes=0}}>
            <label for="tabfour">Console <sup class="small">{consoleNotes>0?consoleNotes:''}</sup></label>
            <div class="tab ">
                <Console value={['New instance created']}/>
            </div>
          </div>
    </div>
    <div class="right">
        <p class="preview">Preview:</p><iframe id="output"></iframe>
    </div>
</div>
{/if}
<style>
    .left, .right
  {
      flex-basis: 50%;
      padding: 10px;
      height: fit-content;
  }
  .code{
    height: 100%;
    resize: both;
    overflow: scroll;
  }
  .container
  {
      width: 99%;
      height: fit-content;
      height: 50vh;
      padding: 4px;
      display: flex;
      overflow: scroll;
      min-height: fit-content;
      min-width: fit-content;
      resize: both;
  }
  div{
    background-color: #1f1f1f;
    color: black;
    border: 0;
    outline: 0;
  }
  p, div{
    margin: 5px;
  }
  #output
  {
      width: 90%;
      height: fit-content;
      height: 100%;
      background-color: #ffffff;
      color: black;
      border: 0;
      outline: 0;
      resize: both;
      border: solid 1px black;
  }
.tabs {
	display: flex;
	flex-wrap: wrap;
}
.tabs label {
	order: 1;
	display: block;
	padding: 1rem 2rem;
	cursor: pointer;
  background: #90CAF9;
  font-weight: bold;
  transition: background ease 0.2s;
}
.tabs .tab {
  order: 99; 
	width: 100%;
	display: none;
  padding: 1rem;
  background: #fff;
}
.tabs input[type="radio"] {
	display: none;
}
.tabs input[type="radio"]:checked + label {
	background: #fff;
}
.tabs input[type="radio"]:checked + label + .tab {
	display: block;
}
@media (max-width: 45em) {
  .tabs .tab,
  .tabs label {
    order: initial;
  }
  .tabs label {
    width: 100%;
    margin-right: 10px;
    margin-top: 0.2rem;
  }
}
.run{
    color: white;
    background-color: transparent;
    outline: none;
    border: solid 1px white;
}
.small{
    margin-left: 1px;
}
  </style>