import express from "express";
import { getdata } from "../controller /user.controller";

import { purchase_book } from "../controller /purchase.controller";
import { rating_controller } from "../controller /rate&review";
import { revenue_controller } from "../controller /revenue.controller";
import { book_controller } from "../controller /book.controller";


export const router = express.Router();

router.post('/signup', getdata.signup);
router.post('/login',getdata.login)
router.post('/newbook',book_controller.booksdata);
router.get('/:bookId',book_controller.searchbyId );
router.post('/purchase',purchase_book.purchase_book)
router.get('/getuser',getdata.getProfile)
router.get('/userpurchase',purchase_book.view_history)
router.post('/review',rating_controller.rate)
router.post('/revenue',revenue_controller.revenue)
