import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    // Handle input changes
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');  // Reset error message on input change
    };

    // Validate amount
    const validateAmount = (amount) => {
        return !isNaN(amount) && Number(amount) > 0;
    };

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault();

        // Check if amount is a valid positive number
        if (!validateAmount(amount)) {
            setError('Amount must be a positive number.');
            return;  // Do not proceed with submission if invalid
        }

        // Submit expense data if validation passes
        addExpense(inputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>
                        Select Business associated with this expense
                    </option>
                    <option value="media">CKK TV</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="farm">Farm</option>
                    <option value="salon">Salon</option>
                    <option value="laundry">Laundry</option>
                    <option value="legal-bag">Legal Bag</option>
                    <option value="philanthropy">Philanthropy</option>
                    <option value="other">Other</option>
                </select>
                
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder="Add A Reference"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name="Add Expense"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus,
            &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }

    .error {
        color: red;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
`;

export default ExpenseForm;



// import React, { useState } from 'react'
// import styled from 'styled-components'
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
// import { useGlobalContext } from '../../context/globalContext';
// import Button from '../Button/Button';
// import { plus } from '../../utils/Icons';


// function ExpenseForm() {
//     const {addExpense, error, setError} = useGlobalContext()
//     const [inputState, setInputState] = useState({
//         title: '',
//         amount: '',
//         date: '',
//         category: '',
//         description: '',
//     })

//     const { title, amount, date, category,description } = inputState;

//     const handleInput = name => e => {
//         setInputState({...inputState, [name]: e.target.value})
//         setError('')
//     }

//     const handleSubmit = e => {
//         e.preventDefault()
//         addExpense(inputState)
//         setInputState({
//             title: '',
//             amount: '',
//             date: '',
//             category: '',
//             description: '',
//         })
//     }

//     return (
//         <ExpenseFormStyled onSubmit={handleSubmit}>
//             {error && <p className='error'>{error}</p>}
//             <div className="input-control">
//                 <input 
//                     type="text" 
//                     value={title}
//                     name={'title'} 
//                     placeholder="Expense Title"
//                     onChange={handleInput('title')}
//                 />
//             </div>
//             <div className="input-control">
//                 <input value={amount}  
//                     type="text" 
//                     name={'amount'} 
//                     placeholder={'Expense Amount'}
//                     onChange={handleInput('amount')} 
//                 />
//             </div>
//             <div className="input-control">
//                 <DatePicker 
//                     id='date'
//                     placeholderText='Enter A Date'
//                     selected={date}
//                     dateFormat="dd/MM/yyyy"
//                     onChange={(date) => {
//                         setInputState({...inputState, date: date})
//                     }}
//                 />
//             </div>
//             <div className="selects input-control">
//                 <select required value={category} name="category" id="category" onChange={handleInput('category')}>
//                     <option value="" disabled >Select Option</option>
//                     <option value="education">Salary</option>
//                     <option value="groceries">Renovation</option>
//                     <option value="health">Ads</option>
//                     <option value="subscriptions">Subscriptions</option>
//                     <option value="takeaways">Maintenance</option>
//                     <option value="clothing">Inventory</option>  
//                     <option value="travelling">Transport</option>  
//                     <option value="other">Other</option>  
//                 </select>
//             </div>
//             <div className="input-control">
//                 <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
//             </div>
//             <div className="submit-btn">
//                 <Button 
//                     name={'Add Expense'}
//                     icon={plus}
//                     bPad={'.8rem 1.6rem'}
//                     bRad={'30px'}
//                     bg={'var(--color-accent'}
//                     color={'#fff'}
//                 />
//             </div>
//         </ExpenseFormStyled>
//     )
// }


// const ExpenseFormStyled = styled.form`
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     input, textarea, select{
//         font-family: inherit;
//         font-size: inherit;
//         outline: none;
//         border: none;
//         padding: .5rem 1rem;
//         border-radius: 5px;
//         border: 2px solid #fff;
//         background: transparent;
//         resize: none;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         color: rgba(34, 34, 96, 0.9);
//         &::placeholder{
//             color: rgba(34, 34, 96, 0.4);
//         }
//     }
//     .input-control{
//         input{
//             width: 100%;
//         }
//     }

//     .selects{
//         display: flex;
//         justify-content: flex-end;
//         select{
//             color: rgba(34, 34, 96, 0.4);
//             &:focus, &:active{
//                 color: rgba(34, 34, 96, 1);
//             }
//         }
//     }

//     .submit-btn{
//         button{
//             box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//             &:hover{
//                 background: var(--color-green) !important;
//             }
//         }
//     }
// `;
// export default ExpenseForm