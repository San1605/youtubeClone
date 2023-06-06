
//local variable ko change ni kr skte yh ren render ni krega to ui p update ni hoga
// local varible vps s initilase ho jayea agar koi state change hui to
// islye useref use krte h ki ren render ni ho t=or inintilase vps s ni ho agae koi state change s render hua ho to


import React, { useRef, useState } from 'react'



const UseRef = () => {
    let X = 10;
    const [state, setState] = useState(10);
    const ref = useRef(10);


    return (
        <div className="m-4 p-2 bg-slate-50 border border-black w-96 h-96">


            <div>
                <span className="font-bold text-xl"> local variable={X}</span>
                <button
                    className="bg-green-100 p-2 m-4"
                    onClick={() =>{ X = X + 1
                    console.log("X="+X)
                    }}>
                    increase X
                </button>
            </div>
            <div>
                <span className="font-bold text-xl">State variable={state}</span>
                <button
                    className="bg-green-100 p-2 m-4"
                    onClick={() => setState(state + 1)}>
                    increase State
                </button>
            </div>
            <div>
                <span className="font-bold text-xl">Ref variable={ref.current}</span>
                <button
                    className="bg-green-100 p-2 m-4"
                    onClick={() => {ref.current = ref.current + 1
                    console.log("ref=",ref.current)
                    }}>
                    increase Ref
                </button>
            </div>
        </div>
    )
}

export default UseRef
