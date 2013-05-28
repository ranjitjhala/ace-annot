
//////////////////////////////////////////////////////////////////////////////////////
// A simple box that follows the mouse around ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

var tooltipNode;

var TokenTooltip = function(editor, annotFun) {
    if (editor.tokenTooltip) return;
    editor.tokenTooltip = this;    
    
    this.editor   = editor;
    this.annotFun = annotFun;

    editor.tooltip = tooltipNode || this.$init();

    this.update = this.update.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    editor.container.addEventListener("mousemove", this.onMouseMove, true);
    editor.container.addEventListener("mouseout", this.onMouseOut, true);

    // editor.on("mousemove", this.onMouseMove);
    // editor.on("mouseout",  this.onMouseOut);
    // event.addListener(editor.renderer.scroller, "mousemove", this.onMouseMove);
    // event.addListener(editor.renderer.content, "mouseout", this.onMouseOut);
};

(function(){
    this.token = {};
    // this.range = new Range();
    
    this.update = function() {
        this.$timer = null;
        
        var r = this.editor.renderer;
        if (this.lastT - (r.timeStamp || 0) > 1000) {
            r.rect = null;
            r.timeStamp = this.lastT;
            this.maxHeight = innerHeight;
            this.maxWidth = innerWidth;
        }

        var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
        var offset = (this.x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
        var row = Math.floor((this.y + r.scrollTop - canvasPos.top) / r.lineHeight);
        var col = Math.round(offset);

        var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
        var session = this.editor.session;
        var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
        
        var token = session.getTokenAt(docPos.row, docPos.column);

        if (!token && !session.getLine(docPos.row)) {
            token = {
                type: "",
                value: "",
                state: session.bgTokenizer.getState(0)
            };
        }
        if (!token) {
            session.removeMarker(this.marker);
            tooltipNode.style.display = "none";
            this.isOpen = false;
            return;
        }
        if (!this.isOpen) {
            tooltipNode.style.display = "";
            this.isOpen = true;
        }
        
        // var tokenText = token.type;
        // if (token.state)
        //     tokenText += "|" + token.state;
        // if (token.merge)
        //     tokenText += "\n  merge";
        // if (token.stateTransitions)
        //     tokenText += "\n  " + token.stateTransitions.join("\n  ");
       
        // var tokenText = "(" + docPos.row + ", " + docPos.column + ")";
        var tokenText = this.annotFun(docPos.row, docPos.column); 

        if (this.tokenText != tokenText) {
            tooltipNode.textContent = tokenText;
            this.tooltipWidth = tooltipNode.offsetWidth;
            this.tooltipHeight = tooltipNode.offsetHeight;
            this.tokenText = tokenText;
        }
        
        this.updateTooltipPosition(this.x, this.y);

        this.token = token;
        session.removeMarker(this.marker);
        this.range = this.editor.getSelectionRange();
        // this.range = new Range(docPos.row, token.start, docPos.row, token.start + token.value.length);
        this.marker = session.addMarker(this.range, "ace_bracket", "text");
    };
    
    this.onMouseMove = function(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        if (this.isOpen) {
            this.lastT = e.timeStamp;
            this.updateTooltipPosition(this.x, this.y);
        }
        if (!this.$timer)
            this.$timer = setTimeout(this.update, 50);
    };
    
    this.onMouseOut = function(e) {
        var t = e && e.relatedTarget;
        var ct = e &&  e.currentTarget;
        while(t && (t = t.parentNode)) {
            if (t == ct)
                return;
        }
        tooltipNode.style.display = "none";
        this.editor.session.removeMarker(this.marker);
        this.$timer = clearTimeout(this.$timer);
        this.isOpen = false;
    };
    
    this.updateTooltipPosition = function(x, y) {
        var st = tooltipNode.style;
        if (x + 10 + this.tooltipWidth > this.maxWidth)
            x = innerWidth - this.tooltipWidth - 10;
        if (y > innerHeight * 0.75 || y + 20 + this.tooltipHeight > this.maxHeight)
            y = y - this.tooltipHeight - 30;
        
        st.left = x + 10 + "px";
        st.top = y + 20 + "px";
    };

    this.$init = function() {
        var ttDiv   = document.createElement("div");
        tooltipNode = document.documentElement.appendChild(ttDiv);
        var st = tooltipNode.style;
        st.position = "fixed";
        st.display = "none";
        st.background = "lightyellow";
        st.borderRadius = "5px";
        st.border = "1px solid gray";
        st.padding = "1px";
        st.zIndex = 1000;
        st.fontFamily = "monospace";
        // st.whiteSpace = "pre-line";
        st.whiteSpace = "pre";
        return tooltipNode;
    };

    this.destroy = function() {
        this.onMouseOut();
        // event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
        // event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
        delete this.editor.tokenTooltip;    
    };

}).call(TokenTooltip.prototype);

