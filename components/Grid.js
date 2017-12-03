import React, { Component } from 'react';
import { TouchableOpacity, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Container = styled.View `
    flex: 1;
    margin: 6px;
    background-color: #214868;

`;

const NumberBox = styled(TouchableOpacity).attrs({
        activeOpacity:1
    })`
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    border: ${props => props.isMiddle ? "3px solid #566e89" : "0px solid black"}
    border-top-width: 0px;
    border-bottom-width: 0px;
    background-color: ${props => props.selected ? "#00213d  " : "transparent"}
    height:100%;
`;

const Row = styled.View `
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border:3px solid #566e89;
    border-left-width: ${props => props.isAnswerRow ? "4px" : "0px" };
    border-right-width: ${props => props.isAnswerRow ? "4px" : "0px" };
    border-top-width: ${props => {
        if(props.isAnswerRow && !props.isLastRow) {
            return "4px";
        }
        else if(!props.isAnswerRow && props.isLastRow) {
            return "8px";
        }
        else {
            return "0px";
        }
    }};
    background-color: ${props => {
        if(props.isAnswerRow && !props.isLastRow) {
            return "#214868";
        }
        else if(!props.isAnswerRow && props.isLastRow) {
            return "#bcbcbc";
        }
        else {
            return "#E1E2E1";
        }
    }}
    
`;

const NumberCell = styled.Text`
    color: ${props => { 
        if(props.isAnswerRow && !props.isLastRow) {
            return "#E1E2E1";
        }
        else if(!props.isAnswerRow && !props.isLastRow) {
            return "transparent";
        }
        else if(!props.isAnswerRow && props.isLastRow && props.isCorrect) {
            return "green";
        }
        else if(!props.isAnswerRow && props.isLastRow && !props.isCorrect) {
            return "red";
        }
        else {
            return "yellow";
        }
    }};
    ${props => props.isAnswerRow ? "": "text-shadow-offset: 1px 1px"};
    ${props => props.isAnswerRow ? "" : "text-shadow-color: rgba(33, 72, 104, 0.8)" };
    ${props => props.isAnswerRow ? "" : "text-shadow-radius:10px" };
    font-family: 'roboto-bold';
    text-align:center;
    font-size: ${props => props.isAnswerRow ? responsiveFontSize(4) : responsiveFontSize(3) };
`;

const data = [];

class Grid extends Component {

    static defaultProps = {
        data: [],
        onClick: console.log,
        currentRow: 0,
        height: 5
    };

    constructor(props) {
        super(props);
        this.state = { selectedTileinRow: -1}
    }
    
    handleBackButton() {
        return true;
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    

    componentWillReceiveProps(nextProps) {
        if (this.props.currentRow !== nextProps.currentRow) {
            this.setState({ selectedTileinRow: -1 });
        }
    }

    onClick(correctBoolean, selectedTileIndex, row, displayedNumber) {
        let correct = correctBoolean;
        let selectedString = row[selectedTileIndex].string;
        if(displayedNumber === "" ) {
            correct = undefined;
            selectedString = "leeg";
        }
        if(selectedTileIndex === this.state.selectedTileinRow) {
            this.setState({ selectedTileinRow: -1});
            this.props.onClick(undefined, row, undefined);
            
        }
        else {  
            this.setState({ selectedTileinRow: selectedTileIndex});
            this.props.onClick(correct, row, selectedString);
        }
    }


    renderRow(index, isAnswerRow, isLastRow) {
        if (index < 0) {
            return [ <NumberBox><NumberCell/></ NumberBox>,  
                <NumberBox isMiddle={true} ><NumberCell/></NumberBox>,
                <NumberBox><NumberCell/></NumberBox>
            ]
        }
        const result = [];
        for(let i = 0; i < this.props.data[index].length; i++) {
            result.push(
                <NumberBox key={i} isAnswerRow={isAnswerRow} isMiddle={i===1} selected={isAnswerRow && this.state.selectedTileinRow === i} activeOpacity={isAnswerRow ? 0 : 1} onPress={() => isAnswerRow && this.onClick(this.props.data[index][i].correct, i,this.props.data[index], this.props.data[index][i].string)}>
                    <NumberCell isAnswerRow={isAnswerRow} isLastRow={isLastRow} isCorrect ={this.props.data[index][i].correct}> 
                        {this.props.data[index][i].string}
                    </NumberCell>
                </NumberBox> );
        }
        return result;
    };

    
    renderRows() {
        const rows = [];
        for (let i = this.props.currentRow - this.props.height + 1; i <= this.props.currentRow; i++) {
            const isAnswerRow = (i === this.props.currentRow -1);
            const isLastRow = (i === this.props.currentRow)
            rows.push( <Row isAnswerRow={isAnswerRow} isLastRow={isLastRow} key={i}>{this.renderRow(i, isAnswerRow, isLastRow)}</Row>);
        }
        return rows;
    };

    render() {
        return (<Container elevation={9} >{this.renderRows()}</Container>);
    }
}
export default Grid;