/**
 * wangEditor扩展,查看源码功能
 * 传入均为 editor实例,非css选择器
 * 
 * 把原来对jquery的依赖剔除了 全部改用原生JS
 *
 * 使用方法:
 *
 * E.viewSource.init(editor);
 */
 
window.wangEditor.viewSource = {
    init: function(editor) {
    	id = editor.id;
    	if(!this.pluginsEditors){
    		this.pluginsEditors = {}
    	}
    	if(this.pluginsEditors[id]){
    		editor = this.pluginsEditors[id];
    	} else {
    		this.pluginsEditors[id]=editor;
    	}
    	editor.isHTML = false;
        //toolbar = editor.$toolbarElem[0];
		toolbar = document.getElementById(editor.toolbarElemId);
		console.log({toolbar});
		html = "<div class='w-e-menu btn_viewSource' title='查看源码' onclick='window.wangEditor.viewSource.run(\""+id+"\")'>Code</div>";
		toolbar.insertAdjacentHTML('beforeend',html);
        //$(toolbar).append("<div class='w-e-menu btn_viewSource' title='查看源码' onclick='window.wangEditor.viewSource.run(\""+id+"\")'>源</div>");
    },
    run: function(id) {
    	editor = this.pluginsEditors[id];
        editor.isHTML = !editor.isHTML;
        _source = editor.txt.html();
        //toolbar = editor.$toolbarElem[0];
		toolbar = document.getElementById(editor.toolbarElemId);
        if (editor.isHTML) {
            _source = _source.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            //$(toolbar).find('.w-e-menu').css({ "display": "none" });
            //$(toolbar).find('.btn_viewSource').css({ "display": "" });
			toolbarbtn = toolbar.getElementsByClassName("w-e-menu");
			console.log({toolbarbtn});
			
			for(var i=0;i<toolbarbtn.length;i++){
				toolbarbtn[i].style.display = "none";
            }
			toolbarView = toolbar.getElementsByClassName("btn_viewSource");
			console.log(toolbarView);
			toolbarView[0].style.display = "";
        } else {
            _source = editor.txt.text().replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&nbsp;/ig, " ");
            //$(toolbar).find('.w-e-menu').css({ "display": "" });
			toolbarbtn = toolbar.getElementsByClassName("w-e-menu");
			
			for(var i=0;i<toolbarbtn.length;i++){
				toolbarbtn[i].style.display = "";
            }
            editor.change && editor.change();
        }
        editor.txt.html(_source);
    }
};

	
