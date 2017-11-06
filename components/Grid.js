import React, {Component} from 'react';
import { TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
const NUMBERS = [
    [
        1, 2, 3
    ],
    [
        4, 6, 7
    ],
    [
        8,"", 0
    ],
    [
        10, 3, 1
    ],
    [
        3, 1,""
    ],
    [
        0, 1, 3
    ],
    [
        1, 2, 3
    ],
    [
        4, 6, 7
    ],
    [
        8, 9, 0
    ],
    [
        10, 3, 1
    ],
    [
        3, 1, 2
    ],
    [0, 1, 3]
];

const Container = styled.View `
    flex: 1;
    background-color: blue;
    border: 1px solid black;

`;

const NumberBox = styled(TouchableOpacity)`
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    border: 1px solid black;
    height:100%;
    ${props => props.isLast && "background-color: #95a5a6;" }
`;

const Row = styled.View `
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ecf0f1; 
    border: ${props => props.isLast ? "3px solid yellow" : "1px solid black" };
`;

const NumberCell = styled.Text`
    text-align:center;
    font-size: 80px;
    color: #34495e;
`;

class Grid extends Component {
    componentDidMount() {
        setInterval(() => this.nextRow(), 2000);
    }
    static defaultProps = {
        height: 5,
        data: NUMBERS,
        onClick: console.log
    };

    constructor(props) {
        super(props);
        this.state = {
            currentRow: this.props.data.length - this.props.height - 1
        };
    }
    

    isFinished() {
        return this.state.currentRow === 0;
    }

    nextRow() {
        this.setState({currentRow: Math.max(this.state.currentRow - 1, 1 - this.props.height)});
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
            .map((number, idx) => <NumberBox isLast={isLast} activeOpacity={isLast ? 0 : 1} onPress={() => isLast && this.props.onClick(number)}><NumberCell>{number}</NumberCell></NumberBox> );
    };

    
    renderRows() {
        const rows = [];
        for (let i = this.state.currentRow; i < this.state.currentRow + this.props.height; i++) {
            const isLast = (i === (this.state.currentRow + this.props.height -1 ));
            rows.push( <Row isLast={isLast} key = {i}>{this.renderRow(i, isLast)}</Row>);
        }
        return rows;
    };

    render() {
        return (<Container >{this.renderRows()}</Container>);
    }
}
export default Grid;