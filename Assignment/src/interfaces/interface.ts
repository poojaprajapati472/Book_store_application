export interface RatingRequest {
    bookId: string;
    userId: string;
    rating: number;
    reviewText: string;
}
export interface signup {
    username: string;
    email: string;
    password: string;
    userType: string;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface Book {
    bookId: string;
    authors: string[];
    sellCount: number;
    title: string;
    description: string;
    price: number;
}
export interface PurchaseData {
    bookId: string;
    userId: string;
    purchaseDate: Date;
    price: number;
}
