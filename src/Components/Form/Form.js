import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Trim any whitespace
        const trimmedAmount = amount.trim();

        // Debugging logs to see the raw amount value and the trimmed value
        console.log('Raw Amount:', amount);
        console.log('Trimmed Amount:', trimmedAmount);

        // Check if the amount is empty or not a valid positive number
        if (trimmedAmount === '') {
            setError('Amount cannot be empty');
            return;
        }

        // Parse the amount and check if it's a valid number
        const parsedAmount = parseFloat(trimmedAmount);

        // Debugging log for parsedAmount to ensure correct conversion
        console.log('Parsed Amount:', parsedAmount);

        if (isNaN(parsedAmount)) {
            setError('Amount must be a valid number');
            return;
        }

        if (parsedAmount <= 0) {
            setError('Amount must be a positive number');
            return;
        }

        // Proceed to add income if the validation is passed
        addIncome({ ...inputState, amount: parsedAmount });

        // Reset form after submitting
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Name of Income"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="media">CKK TV</option>
                    <option value="philanthropy">Philanthropy</option>
                    <option value="salon">Saloon</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="barbershop">Barbershop</option>
                    <option value="farm">Farm</option>
                    <option value="legal-bag">Legal bag</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
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
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }

    .error {
        color: red;
        font-size: 0.9rem;
    }
`;

export default Form;








// import React, { useState } from 'react'
// import styled from 'styled-components'
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
// import { useGlobalContext } from '../../context/globalContext';
// import Button from '../Button/Button';
// import { plus } from '../../utils/Icons';


// function Form() {
//     const {addIncome, getIncomes, error, setError} = useGlobalContext()
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
//         addIncome(inputState)
//         setInputState({
//             title: '',
//             amount: '',
//             date: '',
//             category: '',
//             description: '',
//         })
//     }

//     return (
//         <FormStyled onSubmit={handleSubmit}>
//             {error && <p className='error'>{error}</p>}
//             <div className="input-control">
//                 <input 
//                     type="text" 
//                     value={title}
//                     name={'title'} 
//                     placeholder="Salary Title"
//                     onChange={handleInput('title')}
//                 />
//             </div>
//             <div className="input-control">
//                 <input value={amount}  
//                     type="text" 
//                     name={'amount'} 
//                     placeholder={'Salary Amount'}
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
//                     <option value=""  disabled >Select Option</option>
//                     <option value="salary">CKK TV</option>
//                     <option value="freelancing">Philanthropy</option>
//                     <option value="investments">Saloon</option>
//                     <option value="stocks">Restaurant</option>
//                     <option value="bitcoin">Barbershop</option>
//                     <option value="bank">Farm</option>  
//                     <option value="youtube">Legal bag</option>  
//                     <option value="other">Other</option>  
//                 </select>
//             </div>
//             <div className="input-control">
//                 <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
//             </div>
//             <div className="submit-btn">
//                 <Button 
//                     name={'Add Income'}
//                     icon={plus}
//                     bPad={'.8rem 1.6rem'}
//                     bRad={'30px'}
//                     bg={'var(--color-accent'}
//                     color={'#fff'}
//                 />
//             </div>
//         </FormStyled>
//     )
// }


// const FormStyled = styled.form`
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
// export default Form