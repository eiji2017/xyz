/* 
 * soran
 */

var iridegu =
        {
            iri: function (origen, funRetorno) {

                var request = new XMLHttpRequest();
                var shader = "";
                var terminado = false;
                request.open("GET", origen, true);
                request.responseType = "arraybuffer";
                var puntero = 0;
                request.onload = function (oEvent) {
                    if (request.readyState === 4 && request.status === 200)
                    {
                        var arrayBuffer = request.response;
                        if (arrayBuffer) {
                            var dv = new DataView(arrayBuffer);
                            var nchars = dv.getInt32(puntero);
                            puntero += 4;
                            for (var i = 0; i < nchars; i++) {
                                shader += String.fromCharCode(dv.getUint16(puntero));
                                puntero += 2;
                            }
                        }
                        funRetorno(shader);
                    }
                };
                request.send();
            }
        };

