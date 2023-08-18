<script context="module">
    let consoleOutput,
        terminal,
        terminalHistory = [],
        historyIterator = 0,
        showing = false;
    export let value;
    export function newConsoleEntry(text, color, link, html) {
        let pre = document.createElement("pre");
        if (html) {
            pre.innerHTML = html;
        } else {
            pre.innerText = text;
        }
        if (color) pre.style.color = color;
        if (link) {
            pre.onclick = () => {
                window.open(link, "_blank");
            };
            pre.style.textDecoration = "underline";
        }
        pre.style.margin = "0";
        consoleOutput.appendChild(pre);
        scrollToBottom(consoleOutput);
    }
    async function term(event) {
        if (!output) updatePreview();
        if (event.keyCode == 38) {
            terminalHistory.push(terminal.value);
            if (historyIterator < 1) return;
            historyIterator--;
            return (terminal.value = terminalHistory[historyIterator]);
        }
        if (event.keyCode == 40) {
            if (terminalHistory[historyIterator + 1] == undefined) return;
            historyIterator++;
            return (terminal.value = terminalHistory[historyIterator]);
        }
        if (event.keyCode == 13) {
            terminalHistory.push(terminal.value);
            historyIterator = terminalHistory.length;
            if (commands[terminal.value.split(" ")[0]]) {
                let pre = document.createElement("pre");
                pre.innerText = "$ " + terminal.value;
                document.getElementById("console").appendChild(pre);
                document.getElementById("out").style.display = "none";
                pre.style.margin = "0";
                pre = document.createElement("pre");
                pre.style.margin = "0";
                let inp = terminal.value;
                let cmd = inp.split(" ")[0];
                let args = inp.replace(cmd, "");
                pre.innerText = await commands[cmd](args);
                document.getElementById("console").appendChild(pre);
                document.getElementById("out").style.display = "";
            } else {
                let pre = document.createElement("pre");
                pre.innerText = "$ " + terminal.value;
                pre.style.margin = "0";
                document.getElementById("console").appendChild(pre);
                pre = document.createElement("pre");
                pre.style.margin = "0";
                let Joutput;
                try {
                    Joutput = eval(terminal.value);
                } catch (e) {
                    Joutput = "undefined";
                }
                pre.innerText = Joutput;
                document.getElementById("console").appendChild(pre);
            }
            document.getElementById('preview').innerText=''
            return (terminal.value = "");
        }
        if(terminal.value.replaceAll(' ', '').length>0){
        let Joutput;
        try {
            Joutput = eval(terminal.value);
        } catch (e) {
            Joutput = "undefined";
        }
        document.getElementById("preview").innerText = Joutput
    }
    }
    function scrollToBottom(node) {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    }
    export function clearConsole() {
        consoleOutput.innerHTML = "";
    }
    let commands = {
        install: async function (plugin) {
            let pkg = await getDoc(doc(db, "plugins", plugin));
            if (!pkg.exists()) return "plugin does not exist.";
            plugins += pkg.data().code;
            return "plugin installed sucessfully";
        },
        echo: function (m) {
            return m;
        },
        openFile: async function (type) {
            var input = document.createElement("input");
            input.type = "file";

            input.onchange = (e) => {
                // getting a hold of the file reference
                var file = e.target.files[0];

                // setting up the reader
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");

                // here we tell the reader what to do when it's done reading...
                reader.onload = (readerEvent) => {
                    var content = readerEvent.target.result; // this is the content!
                    if (type == "html") {
                        Uhtml.set(content);
                    } else if (type == "css") {
                        Ucss.set(content);
                    } else if (type == "js") {
                        Ujs.set(content);
                    } else {
                        return (
                            "Invalid Argument: " +
                            type +
                            "\n Supported: html, css, js"
                        );
                    }
                    return "opened successfully";
                };
            };
            input.click();
        },
    };
    if(value){
        value.forEach(element => {
            newConsoleEntry(element)
        });
    }
</script>
<div class="outerConsole" id="outerConsole">
    <div id="console" bind:this={consoleOutput} />
    <div id="out">
        <div class="dollar">$&nbsp;</div>
        <input class="terminal" bind:this={terminal} on:keyup={term} />
        <div id="preview" />
    </div>
</div>
<style>
    #console::-webkit-scrollbar {
        display: none;
    }
    .outerConsole {
        width: calc(50% - 4px);
        height: 20vh;
        background-color: #1f1f1f;
        font-size: 12px;
        color: #fff;
        padding-left: 10px;
        margin-left: 12px;
        resize: both;
        overflow: auto;
        overflow-y: scroll;
        word-wrap: break-word;
    }
    .outerConsole::-webkit-scrollbar {
        opacity: 0%;
    }
    .terminal {
        width: 80%;
        border: 0;
        outline: 0;
        color: white;
        background-color: transparent;
    }
    .terminal,
    .dollar {
        display: inline-block;
    }
    .dollar {
        color: lightgreen;
        width: 10px;
    }
    #preview{
        color: grey;
    }
</style>
