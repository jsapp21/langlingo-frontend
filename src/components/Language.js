import React, { Component } from 'react'
import Category from './Category.js'
import { Flag } from 'semantic-ui-react'

class Language extends Component {

    categories = () => {
        let catNames = this.props.category.map(c => c.category.name)

        const removeDuplicates = (array) => {
            const flag = {}
            const uniqueCategory = []
            
            array.forEach(cat => {
                if (!flag[cat]) {
                    flag[cat] = true
                    uniqueCategory.push(cat)
                }
        })
        return uniqueCategory
    }

        const finalNames = removeDuplicates(catNames)

        const final = finalNames.map(category => {
            switch (category) {
                case 'Animals':
                case 'Emotions':
                case 'Foods':
                case 'Objects':
                case 'Sports':
                    let points = this.props.category
                    return <Category key={category} name={category} points={points} />
                default:
                    return category
            }
        })
        
        return final
    }

    render() {
        return(
            <div>
               <h1>{this.props.language}  <Flag name={this.props.iso} /></h1>
               {this.categories()}
            </div>
        )
    }
}

export default Language;