let preferredStore = {
    initialize: function () {
        if (localStorage) {
            return this.getHomeStore()  
        }
    }, getHomeStore: function () {
        return localStorage.getItem("homeStoreId") || 'none set'
        // return 'none set' //temporary testing
    }, setHomeStore: function (storeId) {     
        localStorage.setItem("homeStoreId", storeId)
    }
}

export { preferredStore }