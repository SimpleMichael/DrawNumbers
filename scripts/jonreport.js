var SimpleMichael = SimpleMichael || {};
SimpleMichael.JonReport = SimpleMichael.JonReport || {};


SimpleMichael.JonReport.Report = function(data){
    this.recordSource = data;
    this.displayColumns = [];
    this.subtotalColumns = [];
    this.groupByColumn = [];
    this.recordsTag = "";
    var that = this;
    var subtotals = [];
    var totals = [];

    this.draw = function(reportId){
        var tbl = document.createElement("table");

        drawColumnHeaders(tbl);
        var records = this.recordSource[this.recordsTag];

        if(records!=null && records.length > 0){
            //init subtotals array
            for(var s=0; s<this.subtotalColumns.length; s++){
                subtotals.push(0);
                totals.push(0);
            }
            var currentGrp = records[0][this.groupByColumn[0]];
            for(var i=0; i<records.length; i++){
                if(currentGrp!=records[i][this.groupByColumn[0]]){
                    drawSubtotals(tbl);
                    currentGrp = records[i][this.groupByColumn[0]];
                    //zero out subtotals
                    for(var s=0; s<this.subtotalColumns.length; s++){
                        subtotals[s] = 0;
                    }
                }
                drawRow(tbl, records[i]);

                for(var s=0; s<this.subtotalColumns.length; s++){
                    subtotals[s] += records[i][this.subtotalColumns[s]];
                    totals[s] += records[i][this.subtotalColumns[s]];
                }
            }
            drawSubtotals(tbl);
            drawTotals(tbl);
        }
        return tbl;
    }

    function drawColumnHeaders(dataTable){

        if(that.displayColumns!=null && that.displayColumns.length>0){
            var hdrRow = document.createElement("tr");
            for(var i=0; i<that.displayColumns.length; i++){
                var hdrColumn = document.createElement("th");
                var hdrText = document.createTextNode(that.displayColumns[i]);
                hdrColumn.appendChild(hdrText);
                hdrRow.appendChild(hdrColumn);

                if(i<that.displayColumns.length - that.subtotalColumns.length){
                    hdrColumn.style.textAlign="left";
                }else{
                    hdrColumn.style.textAlign="right";
                }
            }
            dataTable.appendChild(hdrRow);
        }
    }

    function drawRow(dataTable, record){
        if(that.displayColumns!=null && that.displayColumns.length > 0){
            var newRow = document.createElement("tr");
            for(var i=0; i<that.displayColumns.length; i++){
                var newColumn = document.createElement("td");
                var newColumnText = null;
                //Format Numbers
                if(i<that.displayColumns.length - totals.length){
                    newColumnText = document.createTextNode(record[that.displayColumns[i]]);
                    newColumn.style.textAlign = "left";
                }else{
                    newColumnText = document.createTextNode(Intl.NumberFormat().format(record[that.displayColumns[i]]));
                    newColumn.style.textAlign = "right";
                }
                newColumn.appendChild(newColumnText);
                newRow.appendChild(newColumn);
                
            }
            dataTable.appendChild(newRow);
        }
    }

    function drawSubtotals(dataTable){
        if(that.subtotalColumns!=null && that.subtotalColumns.length>0){
            var stRow = document.createElement("tr");
            var stLabelColumn = document.createElement("td");
            stRow.style.fontWeight = "bold";
            stRow.style.textAlign = "right";
            stLabelColumn.setAttribute("colSpan", that.displayColumns.length - that.subtotalColumns.length);
            stRow.appendChild(stLabelColumn);
            for(var i=0; i<subtotals.length; i++){
                var stColumn = document.createElement("td");

                var stColumnText = document.createTextNode(new Intl.NumberFormat().format(subtotals[i]));
                stColumn.appendChild(stColumnText);
                stRow.appendChild(stColumn);
            }
            dataTable.appendChild(stRow);
        }
    }

    function drawTotals(dataTable){
        if(totals!=null && totals.length>0){
            var ttlRow = document.createElement("tr");
            var ttlLabelColumn = document.createElement("td");
            ttlRow.style.fontWeight = "bold";
            ttlRow.style.textAlign = "right";
            ttlLabelColumn.setAttribute("colSpan", that.displayColumns.length - totals.length);
            ttlRow.appendChild(ttlLabelColumn);
            for(var i=0; i<totals.length; i++){
                var ttlColumn = document.createElement("td");
                var ttlColumnText = document.createTextNode(new Intl.NumberFormat().format(totals[i]));
                ttlColumn.appendChild(ttlColumnText);
                ttlRow.appendChild(ttlColumn);
            }
            dataTable.appendChild(ttlRow);
        }
    }

}
