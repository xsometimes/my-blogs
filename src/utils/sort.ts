

/**
 * 快速排序
 * @param a 数组
 * @param l 左边界
 * @param r 右边界
 * @returns 
 */
export const quickSort = (a: number[], l: number, r: number) => {
    partitionSort(a, 1, a.length);
    return [...a];
}


export const partitionSort = (arr: number[], l: number, r: number) => {
    // 递归的边界条件是区间中只有一个元素
    // x  : 记录从前向后扫描的位置
    // y  : 记录从后向前扫描的位置
    // z  : 基准值，选择待排序区间的第一个元素

    // while 循环中是 partition 过程
    // 每一轮，先从后向前扫，再从前向后扫
    if (l >= r) {
        return;
    }
    let x = l, y = r, z = arr[l];
    while (x < y) {
        while (x < y && arr[y] >= z) --y;
        if (x < y) arr[x++] = arr[y];  // 此时arr[y] < z，将arr[y]的值arr[x+1]
        while (x < y && arr[x] <= z) ++x;
        if (x < y) arr[y--] = arr[x];
    }
    // 将基准值 z 放入其正确位置数组的 x 位
    // 其实，此时 x==y，所以写成 arr[y] = z 也行
    // 再分别对左右区间，进行快速排序
    arr[x] = z;
    partitionSort(arr, l, x - 1);
    partitionSort(arr, x + 1, r);
    return;
}
