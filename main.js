const Singleton = (function () {
    let instance;

    function createInstance() {
        // Your code here...
        // Create your singleton instance here
        // For example:
        // const object = new Object("I am the instance");
        // return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

// Usage:
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // Output: true
