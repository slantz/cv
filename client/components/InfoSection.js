import React, { Component, PropTypes } from 'react'

export default class InfoSection extends Component {

  static propTypes = {
    info: PropTypes.object
  }

  render() {
    const { info } = this.props
    let sections = []

    for (var i in info) {
      if (info.hasOwnProperty(i)) {
        sections.push({
          title: i,
          description: info[i]
        })
      }
    }

    return (
      <section className="container car-list__inner pure-g i-ma">
        {sections.map(function(item){
          return <article className="car car--list pure-u-1-3 car--list_padding car--list_flex" key={item.title}>
            <table>
              <tr>
                <td>{item.title}</td>
                <td>
                  <table>
                    {item.description.map(function(row, rowIndex){
                      return <tr key={rowIndex}>
                        <td>{row.descr}</td>
                        <td>{row.time}</td>
                        <td>{row.link && <div>{row.link.value} + {row.link.title} + {row.link.url}</div>}</td>
                      </tr>
                    })}
                  </table>
                </td>
              </tr>
            </table>
          </article>;
        })}
      </section>
    )
  }
}
