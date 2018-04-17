
$.ajax({
    url: './students-sanji.json',
    type: "get",
    dataType: "json",
    success: function (dataa) {
        var data = dataa.data;
        var addressInit = function (_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea) {
            var cmbProvince = document.getElementById(_cmbProvince);
            var cmbCity = document.getElementById(_cmbCity);
            var cmbArea = document.getElementById(_cmbArea);

            function cmbSelect(cmb, str) {
                for (var i = 0; i < cmb.options.length; i++) {
                    if (cmb.options[i].value == str) {
                        cmb.selectedIndex = i;
                        return;
                    }
                }
            }

            function cmbAddOption(cmb, str, obj, val) {
                var option = document.createElement("OPTION");
                cmb.options.add(option);
                option.innerHTML = str;
                option.value = str;
                option.obj = obj;
                option.dataVal = val;
            }

            function changeCity() {
                cmbArea.options.length = 0;
                if (cmbCity.selectedIndex == -1)return;
                var item = cmbCity.options[cmbCity.selectedIndex].obj;
                for (var i = 0; i < item.gangwei.length; i++) {
                    cmbAddOption(cmbArea, item.gangwei[i].name, null, item.gangwei[i].id);
                }
                cmbSelect(cmbArea, defaultArea);
            }

            function changeProvince() {
                cmbCity.options.length = 0;
                cmbCity.onchange = null;
                if (cmbProvince.selectedIndex == -1)return;
                var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
                for (var i = 0; i < item.timu.length; i++) {
                    cmbAddOption(cmbCity, item.timu[i].name, item.timu[i], item.timu[i].id);
                }
                cmbSelect(cmbCity, defaultCity);
                changeCity();
                cmbCity.onchange = changeCity;
            }

            for (var i = 0; i < data.length; i++) {
                cmbAddOption(cmbProvince, data[i].name, data[i], data[i].id);
            }
            cmbSelect(cmbProvince, defaultProvince);
            changeProvince();
            cmbProvince.onchange = changeProvince;
        }

        addressInit('cmbProvince', 'cmbCity', 'cmbArea');
    }
})
