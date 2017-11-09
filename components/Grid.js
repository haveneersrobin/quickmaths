import React, {Component} from 'react';
import { TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';


const Container = styled.View `
    flex: 1;
    background-color: blue;
    border: 1px solid black;

`;

const NumberBox = styled(TouchableOpacity).attrs({
        activeOpacity:1
    })`
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    border: 1px solid black;
    background-color: ${props => props.selected ? "#5688B3" : "transparent"}
    height:100%;
`;

const Row = styled.View `
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isLast ? "#A1C1B9" : "white" };; 
    border: ${props => props.isLast ? "4px solid #2A435C " : "1px solid black" };
`;

const NumberCell = styled.Text`
    font-family: 'proxima';
    text-align:center;
    font-size: 80px;
    color: ${props => props.isLast ? "#34495e" : "#5688B3" };
`;

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
    

    onClick(number, selected) {
        this.setState({ selectedTileinRow: selected});
        this.props.onClick(number);
    }


    renderRow(index, isLast) {
        if (index < 0) {
            return [ <NumberBox><NumberCell/></ NumberBox>,  
                <NumberBox><NumberCell/></NumberBox>,
                <NumberBox><NumberCell/></NumberBox>
            ]
        }
        return this
            .props
            .data[index]
            .map((number, idx) => <NumberBox key={idx} isLast={isLast} selected={isLast && this.state.selectedTileinRow === idx} activeOpacity={isLast ? 0 : 1} onPress={() => isLast && this.onClick(number, idx)}><NumberCell isLast={isLast}>{number}</NumberCell></NumberBox> );
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
        return (<Container >{this.renderRows()}</Container>);
    }
}
export default Grid;