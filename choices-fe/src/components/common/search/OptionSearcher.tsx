import React from "react";
import {Select} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {SearchOutlined} from "@ant-design/icons";
import styles from './OptionSearcher.module.scss'

interface SearchOption {
    label: string,
    value: string,
    isChecked: boolean,
}

interface OptionSearcherProp {
    searchIconPrefix?: boolean,
    options: Array<SearchOption>,
    labelProp: 'label' | 'value',
    filterProp: 'label' | 'value',
    placeholder?: string,
    size?: SizeType,
    onSelect?: (value: string) => void,
    onDeselect?: (value: string) => void,
    style?: React.CSSProperties,
    searchStyle?: React.CSSProperties,
}

const OptionSearcher: React.FC<OptionSearcherProp> = (
    {
        searchIconPrefix = true,
        options,
        labelProp,
        filterProp,
        placeholder,
        size = 'middle',
        onSelect,
        onDeselect,
        style,
        searchStyle
    }) => {
    const selected = options.filter(item => Boolean(item.isChecked)).map(item => item[filterProp])

    return (
        <div className={styles.search_container} style={style}>
            {searchIconPrefix && <SearchOutlined/>}
            <Select mode={`multiple`}
                    bordered={false}
                    options={options}
                    value={selected}
                    optionLabelProp={labelProp}
                    optionFilterProp={filterProp}
                    size={size}
                    placeholder={placeholder}
                    style={{width: '200px', ...searchStyle}}
                    onSelect={onSelect}
                    onDeselect={onDeselect}
            />
            {!searchIconPrefix && <SearchOutlined/>}
        </div>
    )
}

export default React.memo(OptionSearcher)