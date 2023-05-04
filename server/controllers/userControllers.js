import userModel from "../schemas/userSchema.js"


const testingRoute = (req, res) => {
    res.send('testing users route....')
}

const getAllUsers = async (req, res) => {

    try {
        const allUsers = await userModel.save({})
        console.log(allUsers)
        res.status(200).json({
            allUsers,
            number: allUsers.length
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            error: "something went wrong"
        })
    }

}

export { testingRoute, getAllUsers }