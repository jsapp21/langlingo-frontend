import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'

class Category extends Component {

    points = () => {
        let points = this.props.points.filter(obj => obj.category.name === this.props.name)
        let allPoints = points.map(p => p.points)
        let sum = allPoints.reduce((a,b) => a + b, 0)

        if (sum <= 60) {
            return 15
        } else if (sum > 60 && sum <= 120) {
            return 35
        } else if (sum > 120 && sum <= 180) {
            return 55
        } else if (sum > 180 && sum <= 240) {
            return 75
        } else if (sum > 240) {
            return 100
        }

    }

    render(){
        return (
            <div>
                <p>{this.props.name}</p>
                <Progress percent={this.points()} color='yellow' size='small' progress active />
            </div>
        )
    }

}

export default Category;