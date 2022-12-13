import * as XLSX from 'xlsx';

export const workbook2blob = data => {
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(data), '调令记录');
    // 生成excel的配置项
    const wopts = {
        // 要生成的文件类型
        bookType: 'xlsx',
        // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        type: 'binary',
    };
    const wbout = XLSX.write(workbook, wopts);
    // 将字符串转ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }
    const blob = new Blob([s2ab(wbout)], {
        type: 'application/octet-stream',
    });
    return blob;
};
