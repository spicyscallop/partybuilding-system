import { defineStore } from 'pinia'

export const authentication = defineStore(
    'Authentication',
    {
        state: () => ({
            isAuthenticated: false,
            userNumber: -1,
            partyBranch : '',
            userId: 0,
            type: ''
        }),
        actions: {
            authenticate(userNumber,userId) {
                console.log('zhuce:',userId)
                this.isAuthenticated = true;
                this.userNumber = userNumber;
                this.partyBranch = '第一党支部'
                this.userId = userId;
                this.type = 'student';
            },
            authenticateAsTeacher(userNumber,userId) {
                this.isAuthenticated = true;
                this.userNumber = userNumber;
                this.userId = userId;
                this.type = 'teacher';
            },
            authenticateAsAssociateTeacher(userNumber,userId) {
                console.log("设置完毕")
                this.isAuthenticated = true
                this.userNumber = userNumber
                this.partyBranch = '第一党支部'
                this.userId = userId
                this.type = 'associateTeacher'
            },
            logout() {
                this.isAuthenticated = false;
                this.userNumber = -1;
                this.userId = -1
                this.type = '';
            }
        },
        persist: true,
    })