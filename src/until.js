//  sử dụng để kiểm tra data có phải dưới dạng JSON string hay không , nếu đúng => true / false
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}