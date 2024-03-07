class GetFriendsCircleUnionFind {
    // Time O(1), Space O(1)
    constructor() {
        this.parent = new Map();
        this.rank = new Map(); // stores depth
        this.groups = new Map(); // <parent, set> pair
    }

    // Union by rank, Time O(logn), Space O(logn), n is the total number of people
    addFriendship(a, b) {
        a = capitalizeFirstLetter(a);
        b = capitalizeFirstLetter(b);

        if (this.parent.get(a) == null) { // make set
            this.parent.set(a, a);
            this.rank.set(a, 0);
        }
        if (this.parent.get(b) == null) { // make set
            this.parent.set(b, b);
            this.rank.set(b, 0);
        }
        var x = this.find(a); // union
        var y = this.find(b);
        if (x == y) {
            return;
        }
        if (this.rank.get(x) > this.rank.get(y)) {
            this.parent.set(y, x);
        } else if (this.rank.get(x) < this.rank.get(y)) {
            this.parent.set(x, y);
        } else {
            this.parent.set(x, y);
            this.rank.set(y, this.rank.get(y) + 1);
        }
    }

    // Find the top level, recursion,Time O(logn), Space O(logn)
    find(k) {
        if (this.parent.get(k) != k) {
            this.parent.set(k, this.find(this.parent.get(k)));
        }
        return this.parent.get(k);
    }

    // Separate group by parent, Time O(n*logn), Space O(n)
    findGroups() {
        for (let entry of this.parent.entries()) {
            let i = entry[0];
            let p = this.find(i);
            if (this.groups.get(p) == null)
                this.groups.set(p, new Set());
            this.groups.get(p).add(i);
        }
    }

    // Find belonging group, Time O(n*logn), Space O(n)
    getFriendsCircle(a) {
        a = capitalizeFirstLetter(a);

        if (this.groups.size == 0)
            this.findGroups();
        var res = new Set();
        for (let entry of this.groups.entries()) {
            let t = entry[1];
            if (t.has(a)) {
                res = t;
                break;
            }
        }
        return res;
    }
}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

let g = new GetFriendsCircleUnionFind();
g.addFriendship("Amy", "Chris");
g.addFriendship("Sarah", "gugan");
g.addFriendship("gugan", "Zoe");
g.addFriendship("Sarah", "Jess");
g.addFriendship("Zoe", "Sam");
g.addFriendship("Manoj", "Sarah");
g.addFriendship("gugan", "Thiru");
g.addFriendship("Sarah", "Arun");
g.addFriendship("Arul", "Sam");
g.addFriendship("Manoj", "Sarah");
g.addFriendship("Bala", "Sarah");
g.addFriendship("gugan", "Selva");
g.addFriendship("Sarah", "Guna");
g.addFriendship("Pradeesh", "Sam");
g.addFriendship("Varun", "Sarah");
g.addFriendship("joel", "Sam");
g.addFriendship("guru", "Sarah");
g.addFriendship("Bala", "Sarah");
g.addFriendship("gugan", "Selva");
g.addFriendship("Sarah", "Guna");
g.addFriendship("Pradeesh", "Sam");
g.addFriendship("Varun", "Sarah");
g.addFriendship("joel", "Sam");
g.addFriendship("guru", "Sarah");
g.addFriendship("Bala", "Sarah");
g.addFriendship("gugan", "Selva");
g.addFriendship("Sarah", "Guna");
g.addFriendship("Pradeesh", "Sam");
g.addFriendship("Varun", "Sarah");
g.addFriendship("joel", "Sam");
g.addFriendship("guru", "Sarah");

function Call() {
    var givenName1 = document.getElementById("friend1").value;
    var givenName2 = document.getElementById("friend2").value;

    var set1 = new Set();
    g.getFriendsCircle(givenName1).forEach(x => {
        set1.add(x);
    });

    var set2 = new Set();
    g.getFriendsCircle(givenName2).forEach(x => {
        set2.add(x);
    });

    var commonSet = new Set();
    set1.forEach(x => {
        if (set2.has(x) && x !== givenName1 && x !== givenName2) {
            commonSet.add(x);
        }
    });

    // Convert the Set to an array for easy parameter passing
    var commonFriendsArray = Array.from(commonSet);

    // Construct the URL for nextpage.html with the common friends as a parameter
    var nextPageUrl = 'nextpage.html?friends=' + encodeURIComponent(JSON.stringify(commonFriendsArray));

    // Open nextpage.html in a new tab
    window.open(nextPageUrl, '_blank');
}
