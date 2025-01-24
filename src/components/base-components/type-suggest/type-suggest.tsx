import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import './type-suggest.scss';

interface iTypeSuggestProp {
  data: any[];
  selected: Function;
  subKey?: string;
  subKey2?: string;
  subKey3?: string;
  subKey4?: string;
  floatOption?: boolean;
  typePlaceholder?: string;
  listLength?: number;
  initialValue?: string;
  commaSeparated?: boolean;
}

const TypeSuggestComponent = (props: iTypeSuggestProp) => {

  const [suggestionList, setSuggestionList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState(props.initialValue || '');
  const [inputSelected, setInputSelected] = useState(props.initialValue ? true : false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectionInArea, setSelectionInArea] = useState(false);

  const changeInputValue = (event: any) => {
    setInputSelected(false);
    const value = event.target?.value;
    setInputValue(value);
    props.selected('');
    if(value){
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  const hideSuggestions = (event: any) => {
    if(!selectionInArea) {
      setShowSuggestions(false);
    }
  }

  const toggleSelectionArea = (type: boolean) => {
    setSelectionInArea(type);
  }

  const selectListItem = (item: any) => {
    if(props.subKey) {
      setInputValue(item[props.subKey]);
    } else {
      setInputValue(item);
    }
    props.selected(item);
    setInputSelected(true);
    setShowSuggestions(false);
  }

  const filterSelection = () => {
    if(!inputValue) {
      setSuggestionList([]);
      return;
    }
    // console.log({inputValue})
    const selection: any[] = [];
    for(let i = 0; (i < props.data.length && selection.length <= (props.listLength || 10)); i++) {
      const controlValue: string = props.subKey ? props.data[i][props.subKey || ''] : props.data[i];
      const controlValue2: string = props.subKey2 ? props.data[i][props.subKey2 || ''] : '';
      const controlValue3: string = props.subKey3 ? props.data[i][props.subKey3 || ''] : '';
      const controlValue4: string = props.subKey4 ? props.data[i][props.subKey4 || ''] : '';
      // console.log({controlValue, controlValue2, controlValue3, controlValue4})
      if(
        ((controlValue && typeof(controlValue) === 'string' && controlValue.toLocaleLowerCase()) ? controlValue.toLocaleLowerCase().includes(inputValue?.toLocaleLowerCase()) : false) || 
        ((controlValue2 && typeof(controlValue2) === 'string' && controlValue2.toLocaleLowerCase()) ? controlValue2.toLocaleLowerCase().includes(inputValue?.toLocaleLowerCase()) : false) || 
        ((controlValue3 && typeof(controlValue3) === 'string' && controlValue3.toLocaleLowerCase()) ? controlValue3.toLocaleLowerCase().includes(inputValue?.toLocaleLowerCase()) : false) || 
        ((controlValue4 && typeof(controlValue4) === 'string' && controlValue4.toLocaleLowerCase()) ? controlValue4.toLocaleLowerCase().includes(inputValue?.toLocaleLowerCase()) : false)
      ){
        selection.push(props.data[i]);
      }
    }
    setSuggestionList(selection);
  }

  useEffect(() => {
    filterSelection();
  }, [inputValue]);

  return (
    <div className="type-suggest" onBlur={hideSuggestions} onMouseLeave={() => toggleSelectionArea(false)} onMouseEnter={() => toggleSelectionArea(true)}>
      <div className={"type-box" + (inputSelected ? ' selected' : '')}>
        <input
          type="text"
          placeholder={props.typePlaceholder || "Enter search details"}
          value={inputValue}
          onChange={changeInputValue}
        />
      </div>
      {
        showSuggestions &&
        <div className={"Suggestion-list" + (props.floatOption ? ' floating-list' : '')}>
          <div className="scrollable">
            {
              suggestionList.map((item, index) => (
                <div key={index} className="list-item" onClick={() => selectListItem(item)}>
                  <p className="mb-0">
                    {props.subKey ? item[props.subKey] : item}
                    {props.subKey2 ? props.commaSeparated ? `, ${item[props.subKey2]}` : ` (${item[props.subKey2]})` : ''}
                    {props.subKey3 ? props.commaSeparated ? `, ${item[props.subKey3]}` : ` (${item[props.subKey3]})` : ''}
                    {props.subKey4 ? props.commaSeparated ? `, ${item[props.subKey4]}` : ` (${item[props.subKey4]})` : ''}
                  </p>
                </div>
              ))
            }
            {
              suggestionList.length === 0 &&
              <p className="text-center mb-0 reduced">No item matches your search</p>
            }
          </div>
        </div>
      }
    </div>
  );
}
export default TypeSuggestComponent;
