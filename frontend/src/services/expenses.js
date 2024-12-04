import axiosInstance from "./axiosInstance";

const insertExpense = async (expense) => {
    try {
        const response = await axiosInstance.post('/expenses/', expense);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getExpenses = async () => {
    try {
        const response = await axiosInstance.get('/expenses/');
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const deleteExpenseWithId = async (id) => {
    try {
        const response = await axiosInstance.delete(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}



export { insertExpense, getExpenses, deleteExpenseWithId };