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

function onBeforeRender() {
    $("#myPopup").dxPopup({
        width: 800, height: 600,
        title: "Underlying data",
        showCloseButton: true
    });
}