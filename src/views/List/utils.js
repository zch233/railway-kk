import dayjs from 'dayjs';
import { useStoreApp } from '@src/store/modules/app';

export const timeSlot = step => {
    //  step = 间隔的分钟
    const date = new Date();
    date.setHours(0); // 时分秒设置从零点开始
    date.setSeconds(0);
    date.setUTCMinutes(0);

    const timeArr = [];
    const slotNum = (24 * 60) / step; // 算出多少个间隔
    for (let f = 0; f < slotNum; f++) {
        //  stepM * f = 24H*60M
        // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
        const time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f)); // 获取：零点的时间 + 每次递增的时间
        let hour = '',
            sec = '';
        time.getHours() < 10 ? (hour = '0' + time.getHours()) : (hour = time.getHours()); // 获取小时
        time.getMinutes() < 10 ? (sec = '0' + time.getMinutes()) : (sec = time.getMinutes()); // 获取分钟
        timeArr.push(hour + ':' + sec);
    }
    return timeArr;
};

export const getStatus = (record, time) => {
    const appStore = useStoreApp();
    let status = true;
    appStore.orderList.map(v => {
        if (v.list.includes(record[0])) {
            if (dayjs(time).isBetween(dayjs(v.time[0]).add(-1, 'day'), dayjs(v.time[1]).add(1, 'day'))) {
                status = v.type === '1';
            }
        }
    });
    return status;
};
