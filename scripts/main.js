
function writeReceiptsAndOutlays(data){
    if(data==null) return;
    var dataItemsTag = "Items";
    var dataTable = document.getElementById("expenditures");
    var headers = [];
    var subTotals = [0, 0, 0, 0, 0, 0];
    var grandTotal = [0, 0, 0, 0, 0, 0];
    var grpName = "";
    
    var rpt = new SimpleMichael.JonReport.Report(data);
    rpt.displayColumns = ['Fnction','Subfunction', 'FY 1962', 'FY 1963', 'FY 1964'];
    rpt.subtotalColumns = ["FY 1962","FY 1963","FY 1964"];
    rpt.recordsTag = 'Items';
    rpt.groupByColumn = ['Fnction'];
    
    document.body.appendChild(rpt.draw());

}
