let preferredStore = {
    initialize: function () {
        if (localStorage) {
            return this.getHomeStore()  
        }
    }, getHomeStore: function () {
        return localStorage.getItem("homeStoreId") || 'none set'
    }, setHomeStore: function (storeId) {     
        localStorage.setItem("homeStoreId", storeId)
    }
}

export { preferredStore }