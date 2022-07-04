function onBeforeRender(sender) {
    var dashboardControl = sender;

    var viewerApiExtension = dashboardControl.findExtension('viewerApi');
    if (viewerApiExtension)
        viewerApiExtension.on('itemClick', onItemClick);

    $("#myPopup").dxPopup({
        width: 800, height: 600,
        title: "Underlying data",
        showCloseButton: true
    });
}

function onItemClick(args) {
    var underlyingData = [];

    args.requestUnderlyingData(function (data) {
        dataMembers = data.getDataMembers();
        for (var i = 0; i < data.getRowCount(); i++) {
            var dataTableRow = {};
            $.each(dataMembers, function (_, dataMember) {
                dataTableRow[dataMember] = data.getRowValue(i, dataMember);
            });
            underlyingData.push(dataTableRow);
        }

        var $grid = $('<div/>');
        $grid.dxDataGrid({
            height: 500,
            scrolling: {
                mode: 'virtual'
            },
            dataSource: underlyingData
        });

        var popup = $("#myPopup").data("dxPopup");
        $popupContent = popup.content();
        $popupContent.empty();
        $popupContent.append($grid);
        popup.show();
    });
}