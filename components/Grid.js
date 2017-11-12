import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
    border-left-width: ${props => props.isLast ? "4px" : "0px" };
    border-right-width: ${props => props.isLast ? "4px" : "0px" };
    border-top-width: ${props => props.isLast ? "4px" : "0px" };
    background-color: ${props => props.isLast ? "#214868" : "#E1E2E1" };
    
`;

const NumberCell = styled.Text`
    color: ${props => props.isLast ? "#E1E2E1" : "transparent" };;
    ${props => props.isLast ? "": "text-shadow-offset: 1px 1px"};
    ${props => props.isLast ? "" : "text-shadow-color: rgba(33, 72, 104, 0.8)" };
    ${props => props.isLast ? "" : "text-shadow-radius:10px" };
    font-family: 'roboto-bold';
    text-align:center;
    font-size: ${props => props.isLast ? responsiveFontSize(6) : responsiveFontSize(3) };
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

    componentWillReceiveProps(nextProps) {
        if (this.props.currentRow !== nextProps.currentRow) {
            this.setState({ selectedTileinRow: -1 });
        }
    }

    onClick(correct, selected, row) {
        if(selected === this.state.selectedTileinRow) {
            this.setState({ selectedTileinRow: -1});
            this.props.onClick(undefined, row);
            
        }
        else {  
            this.setState({ selectedTileinRow: selected});
            this.props.onClick(correct, row);
        }
    }


    renderRow(index, isLast) {
        if (index < 0) {
            return [ <NumberBox><NumberCell/></ NumberBox>,  
                <NumberBox isMiddle={true} ><NumberCell/></NumberBox>,
                <NumberBox><NumberCell/></NumberBox>
            ]
        }
        const result = [];
        for(let i = 0; i < this.props.data[index].length; i++) {
            result.push(
                <NumberBox key={i} isLast={isLast} isMiddle={i===1} selected={isLast && this.state.selectedTileinRow === i} activeOpacity={isLast ? 0 : 1} onPress={() => isLast && this.onClick(this.props.data[index][i].correct, i,this.props.data[index])}>
                    <NumberCell isLast={isLast}> 
                        {this.props.data[index][i].string}
                    </NumberCell>
                </NumberBox> );
        }
        return result;
        {/*return this
            .props
            .data[index]
            .map((number, idx) => 
            
                <NumberBox key={idx} isLast={isLast} isMiddle={idx===1} selected={isLast && this.state.selectedTileinRow === idx} activeOpacity={isLast ? 0 : 1} onPress={() => isLast && this.onClick(number, idx)}>
                    <NumberCell isLast={isLast}> 
                        {number}
                    </NumberCell>
        </NumberBox> );*/}
    };

    
    renderRows() {
        const rows = [];
        for (let i = this.props.currentRow - this.props.height + 1; i <= this.props.currentRow; i++) {
            const isLast = (i === this.props.currentRow);
            rows.push( <Row isLast={isLast} key={i}>{this.renderRow(i, isLast)}</Row>);
        }
        return rows;
    };

    render() {
        return (<Container elevation={9} >{this.renderRows()}</Container>);
    }
}
export default Grid;