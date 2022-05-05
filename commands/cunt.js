

module.exports = {
    name: 'am',
    description: 'tells u if youre a ____',
    async execute(message) {

        let mString = message.content
        let mSplit = mString.split(" ")
        
        // debuggin shit dont mind these
        // console.log(mSplit[4])
        // let finalString = `am ${unholyString} ${mSplit[4]}`
        // console.log(finalString)
        // const unholyString = "i a"


        switch (mSplit[4]) {

            case ("cunt"): {
                message.reply("yes you are");
                break;
            }
        }
    },
};
