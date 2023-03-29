import { Request, Response, Router } from "express";
import EventModel from "../models";
import { createError, validate } from "../../helpers";
import { logger } from "../../../shared";
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
    UNAUTHORIZED
} from "http-status";
import { param } from "express-validator";
import User, { UserDoc } from "../../auth/models";
import Post from "../models";
import { isDocument } from "@typegoose/typegoose";
import { Errors } from "../../errors";
import mongoose from "mongoose";

const router = Router();

/**
 * @openapi
 * /post/{id}:
 *  delete:
 *    summary: Deletes an existing post (must be post owner or admin)
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: ObjectId
 *        required: true
 *        description: ObjectId of the post to delete
 *    tags:
 *      - post
 *    responses:
 *      '200':
 *        description: Post deleted successfully
 *      '401':
 *        description: Not logged in or not an admin
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResErr'
 *      '500':
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResErr'
 */
router.delete(
    "/:_id",
    param("_id").isMongoId(),
    validate,
    async (req: Request, res: Response) => {
        try {
            const post = await Post.findOne({ _id: req.params._id }).populate(
                "fromUser"
            );
            if (!post) {
                return res
                    .status(BAD_REQUEST)
                    .json(createError(Errors.POST_NOT_FOUND));
            }

            if (!isDocument(post?.fromUser)) {
                logger.error("Post fromUser not populated");
            } else {
                const reqUser = req.user as unknown as UserDoc;
                const user = post.fromUser as unknown as UserDoc;

                if (!reqUser?.isAdmin || user._id.toString() !== reqUser?._id) {
                    return res
                        .status(UNAUTHORIZED)
                        .json(createError(Errors.MUST_BE_POST_OWNER));
                }

                (
                    user.posts as mongoose.Types.Array<mongoose.Types.ObjectId>
                ).pull(post._id);
                await user.save();
            }

            await post.deleteOne();
            res.sendStatus(OK);
        } catch (err) {
            logger.error("Error while deleting post");
            logger.error(err);
            res.status(INTERNAL_SERVER_ERROR).json(createError());
        }
    }
);

export default router;