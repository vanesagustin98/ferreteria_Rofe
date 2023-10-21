import getReview from '../controllers/Review/getReview';
import getIdReview from '../controllers/Review/getIdReview';
import postReview from '../controllers/Review/postReview';

export default async (req, res) => {
    const {
        query: { idReview },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                if (idReview) {
                    const reviewById = await getIdReview(idUser);
                    return res.status(200).json(reviewById);
                } else {
                    const allReviews = await getReview();
                    return res.status(200).json(allReviews);
                }
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        case 'POST':
            try {
                const newReview = await postReview(req.body)
                console.log(newReview);
                return res.status(200).json(newReview)
            } catch (error) {
                return res.status(400).json({ error: error.message })
            }
        // case 'PUT':
        //     try {
        //         const userUpdated = await editUser(req.body)
        //         return res.status(200).json(userUpdated)
        //     } catch (error) {
        //         return res.status(400).json({ error: error.message })
        //     }
        // case "DELETE":
        //     try {
        //         const { idUser, permanently } = req.body
        //         if (permanently === true) {
        //             const delProduct = await deleteUser(idUser)
        //             return res.status(201).json(delProduct)
        //         } else {
        //             const delProduct = await deleteLogic(idUser)
        //             return res.status(201).json(delProduct)
        //         }
        //     } catch (error) {
        //         return res.status(400).json({ error: error.message })
        //     }

        default:
            break;
    }
}