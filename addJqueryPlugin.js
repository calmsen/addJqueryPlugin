define("addJqueryPlugin", [], function () {
    function addJqueryPlugin(classFunc, pluginName) {
        $.fn[pluginName] = function (method, arg1, arg2, arg3, arg4) {

            var params = arguments;
            var result = undefined;

            this.each(function () {
                var element = $(this);
                if (!element.data(pluginName)) {
                    var arg0 = method || {};
                    if (typeof arg0 === 'object') {
                        if (!arg0.element) {
                            arg0.element = element;
                        }
                    }
                    element.data(pluginName, new classFunc(arg0, arg1, arg2, arg3, arg4));
                    if (!element.data(pluginName).element) {
                        element.data(pluginName).element = element;
                    }
                }
                else if (element.data(pluginName)[method]) {
                    result = element.data(pluginName)[method](arg1, arg2, arg3, arg4);//.apply(element.data(pluginName), Array.prototype.slice.call(params, 1));

                    return result !== undefined ? false : true;
                }
                else {
                    if (typeof method == "string" && element.data(pluginName)) {
                        $.error('Метод ' + method + ' не существует в jQuery.' + pluginName);
                    }
                }
            });

            return result !== undefined ? result : this;
        };
    }

    return addJqueryPlugin;
});