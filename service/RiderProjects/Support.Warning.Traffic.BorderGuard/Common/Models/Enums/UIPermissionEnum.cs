using System.ComponentModel;

namespace CKLS.Common.Models.Enums
{
    public enum UIPermissionEnum
    {
        [Description("Hải quan cổng VN nhập khẩu ")]
        ImportCustomsVN,
        [Description("Hải quan cổng VN xuất khẩu ")]
        ExportCustomsVN,

        [Description("Hải quan cổng VN xuất khẩu ")]
        ImportCustomsSupervisionOfGoods,
        [Description("Hải quan cổng VN xuất khẩu ")]
        ExportCustomsSupervisionOfGoods,

        [Description("Hải quan phân tách hồ sơ nhập khẩu")]
        ImportCustomsSeparatesDocuments,
        [Description("Hải quan phân tách hồ sơ xuất khẩu")]
        ExportCustomsSeparatesDocuments,
        [Description("Hải quan phân tách hồ sơ TQ")]
        CNCustomsSeparatesDocuments,

        [Description("Hải quan quốc tế nhập khẩu")]
        ImportInternaltionalCustoms,
        [Description("Hải quan quốc tế xuất khẩu")]
        ExportInternaltionalCustoms,
        [Description("Hải quan quốc tế TQ")]
        CNInternaltionalCustoms,

        [Description("Biên phòng nhập khẩu vn")]
        ImportBorderGuardVN,
        [Description("Biên phòng xuất khẩu vn")]
        ExportBorderGuardVN,


        [Description("Biên phòng nhập khẩu tq")]
        ImportBorderGuardCN,

        [Description("Biên phòng xuất khẩu tq")]
        ExportBorderGuardCN,

        [Description("Kiểm dịch y tế")]
        MedicalQuarantine,

        [Description("Kiểm dịch thực vật")]
        Phytosanitary,

        [Description("Kiểm dịch động vật")]
        AnimalQuarantine,


        [Description("Tất cả")]
        All
    }
}
