import prisma from "../database";
import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";


export async function getBooks() {
  const query = `SELECT * FROM books`;
  const result = await prisma.books.findMany()
  return result
}

export async function getBook(id: number) {
  const query = `SELECT * FROM books WHERE id = $1`;
  const result = await prisma.books.findUnique({
    where:{
      id
    }
  })
  return result;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const query = `
    INSERT INTO books (title, author, publisher, "purchaseDate")
    VALUES ($1, $2, $3, $4)`;

  const result = await prisma.books.create({
    data:{
      title, 
      author, 
      publisher, 
      purchaseDate
    }
  })
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  const query = `
    UPDATE books 
    SET
      grade = $1,
      review = $2,
      read = true 
    WHERE id = $3
  `;

  const result = await prisma.books.update({
    data:{
      grade,
      review,
      read:true
    },
    where:{
      id:bookId
    }
  })
}