import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref as sref, getDownloadURL, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA6aT4iV5Jx0Hr58WIK3sTEup-CwHC5heM",
    authDomain: "coffee-store-dec7f.firebaseapp.com",
    projectId: "coffee-store-dec7f",
    storageBucket: "coffee-store-dec7f.appspot.com",
    messagingSenderId: "706499806977",
    appId: "1:706499806977:web:0f5177b2290356c0a83d00"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage()

const productsRef = collection(db, 'products')
const employeesRef = collection(db, 'employees')
const oderRef = collection(db, 'oders')

const getData = async (ref) => {
    let list = []
    const res = await getDocs(ref)
    res.docs.forEach(doc => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        list = [...list, data]
    })
    return list
}

const addData = async (ref, data) => {
    return await addDoc(ref, data)
}

const updateData = async (ref, data) => {
    return await updateDoc(ref, data)
}

const deleteData = async (ref) => {
    return await deleteDoc(ref)
}

export const upload = (file) => {
    if (!file) {
        return
    }
    const imgRef = sref(storage, 'img/' + `${file.name}`)
    return uploadBytes(imgRef, file)
}

export const getImgURL = (name) => {
    const imgRef = sref(storage, 'img/' + `${name}`)
    return getDownloadURL(imgRef)
}

// =====================
export const getProductsFromFirebase = async () => {
    return await getData(productsRef)
}

export const addProductToFirebase = async (product) => {
    return await addData(productsRef, product)
}

export const updateProductToFirebase = async (product) => {
    const ref = doc(db, 'products', product.id)
    return await updateData(ref, product)
}

export const deleteProductInFirebase = async (product) => {
    const ref = doc(db, 'products', product.id)
    return await deleteData(ref)
}

export const getEmployeesFromFirebase = async () => {
    return await getData(employeesRef)
}

export const addEmployeeToFirebase = async (employee) => {
    return await addData(employeesRef, employee)
}

export const updateEmployeeInFirebase = async (employee) => {
    const ref = doc(db, 'employees', employee.id)
    return await updateData(ref, employee)
}

export const deleteEmployeeInFirebase = async (employee) => {
    const ref = doc(db, 'employees', employee.id)
    return await deleteData(ref)
}

export const addOderToFirebase = async (oder) => {
    console.log(oder);
    return await addData(oderRef, oder)
}

export const getOdersFromFirebase = async () => {
    return await getData(oderRef)
}