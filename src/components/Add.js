function Add() {
    // const divs = Array.from({ length: divCount }, (_, index) => (
    //     <div
    //         contentEditable="true"
    //         key={index}
    //         id={`div-${index}`}
    //         className={`box ${index === selectedIndex ? "selected" : ""}`}
    //     >
    //         {roster[index]}
    //     </div>
    // ));
    return (
        <div className="add container">
            <div contentEditable="true" className={`box`}>
                Add users
            </div>
        </div>
    );
}

export default Add;
