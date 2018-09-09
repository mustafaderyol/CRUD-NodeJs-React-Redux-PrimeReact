import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import {Growl} from 'primereact/growl';
import {InputText} from 'primereact/inputtext';
import {HashLoader} from 'react-spinners';
import {connect} from 'react-redux';

import {
    fetchParameterTypes,
    newParameterTypes,
    deleteParameterTypes,
    updateParameterTypes
} from '../../actions/parameterTypes';

class ParameterTypePage extends Component {
    // Init
    constructor() {
        super();
        this.state = {
            dataList:[],
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            validateError: [],
            selectRow: {
                name: ''
            },
            newData: {
                name: ''
            }
        };
        this.onOpenNewDialog = this.onOpenNewDialog.bind(this);
        this.onHideNewDialog = this.onHideNewDialog.bind(this);
        this.saveAction = this.saveAction.bind(this);
        this.newDataValidateError = this.newDataValidateError.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editAction = this.editAction.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.onOpenDeleteDialog = this.onOpenDeleteDialog.bind(this);
        this.onHideDeleteDialog = this.onHideDeleteDialog.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
    }

    componentDidMount() {
        this.props.fetchParameterTypes();
    }

    // METODS
    // New Dialog
    onOpenNewDialog(event) {
        this.setState({
            visibleNewDialog: true,
            newData: {
                name: ''
            }
        });
    }

    onHideNewDialog(event) {
        this.setState({visibleNewDialog: false});
    }

    saveAction(e) {
        const errors = this.newDataValidateError();
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.newParameterTypes(this.state.newData.name);
            this.onHideNewDialog(e);
            this.growl.show({severity: 'success', summary: 'Başarılı :D', detail: 'İşlem Başarılı'});
        }
    }

    newDataValidateError() {
        const errorList = [];
        if (!this.state.newData.name) {
            errorList.push({
                severity: 'error',
                summary: 'Boş Bırakılamaz!',
                detail: 'Ad'
            });
        }
        return errorList;
    }

    //Edit Dialog
    onOpenEditDialog(event, rowData) {
        this.setState({
            visibleEditDialog: true,
            selectRow: rowData
        });
    }

    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: ''
            }
        });
    }

    editAction(e) {
        const errors = this.editDataValidateError();
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.updateParameterTypes(this.state.selectRow._id, this.state.selectRow.name);
            this.onHideEditDialog(e);
            this.growl.show({severity: 'success', summary: 'Başarılı :D', detail: 'İşlem Başarılı'});
        }
    }

    editDataValidateError() {
        const errorList = [];
        if (!this.state.selectRow.name) {
            errorList.push({
                severity: 'error',
                summary: 'Boş Bırakılamaz!',
                detail: 'Ad'
            });
        }
        return errorList;
    }

    //Delete Dialog
    onOpenDeleteDialog(event, rowData) {
        this.setState({
            visibleDeleteDialog: true,
            selectRow: rowData
        });
    }

    onHideDeleteDialog(event) {
        this.setState({
            visibleDeleteDialog: false,
            selectRow: {
                name: ''
            }
        });
    }

    deleteAction(e) {
        this.props.deleteParameterTypes(this.state.selectRow._id);
        this.onHideDeleteDialog(e);
        this.growl.show({severity: 'success', summary: 'Başarılı :D', detail: 'İşlem Başarılı'});
    }

    // Template
    actionTemplate(rowData, column) {
        return <div>
            <Button type="button" icon="pi pi-pencil" className="p-button-success"
                    style={{marginRight: '.5em', fontSize: '12px'}} onClick={(e) => {
                this.onOpenEditDialog(e, rowData);
            }}></Button>
            <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{fontSize: '12px'}}
                    onClick={(e) => {
                        this.onOpenDeleteDialog(e, rowData);
                    }}></Button>
        </div>;
    }

    render() {
        const items = [
            {label: 'Parametre Tanımlama'},
            {label: 'Parametre Tipleri'}
        ];

        let header = <div className="p-clearfix" style={{lineHeight: '1.87em'}}>Parametre Tipleri
            <Button style={{float: 'right', fontSize: '12px'}} icon="pi pi-plus" onClick={this.onOpenNewDialog}/>
        </div>;

        const newDialogFooter = (
            <div>
                <Button label="Vazgeç" className="p-button-danger" icon="pi pi-times" onClick={this.onHideNewDialog}/>
                <Button label="Kaydet" className="p-button-success" icon="pi pi-check" onClick={this.saveAction}/>
            </div>
        );

        const editDialogFooter = (
            <div>
                <Button label="Vazgeç" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Güncelle" className="p-button-success" icon="pi pi-check" onClick={this.editAction}/>
            </div>
        );

        const deleteDialogFooter = (
            <div>
                <Button label="Evet" className="p-button-primary" icon="pi pi-check" onClick={this.deleteAction}/>
                <Button label="Hayır" className="p-button-secondary" icon="pi pi-times"
                        onClick={this.onHideDeleteDialog}/>
            </div>
        );

        return (<div className="ui-g">
                <div className="ui-g-12">
                    <div className="card">
                        <Growl ref={(el) => this.growl = el}/>
                        <BreadCrumb model={items} home="/"/>
                        <br/>
                        <div className="content-section implementation">

                            <DataTable value={this.props.dataList} header={header}>
                                <Column field="name" header="Adı"/>
                                <Column body={this.actionTemplate.bind(this)}
                                        style={{textAlign: 'center', width: '8em'}}/>
                            </DataTable>

                            <HashLoader
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={this.props.fetching}
                            />
                            <Dialog header="Ekle" footer={newDialogFooter} visible={this.state.visibleNewDialog}
                                    className=""
                                    width="350px" modal={true} onHide={this.onHideNewDialog}>
                                <span className="ui-float-label">
                                    <label htmlFor="in">Ad </label>
                                    <InputText id="in" value={this.state.newData.name} style={{marginLeft: '.5em'}}
                                               onChange={(e) =>
                                                   this.setState({
                                                       newData: {
                                                           ...this.state.newData,
                                                           name: e.target.value
                                                       }
                                                   })
                                               }/>
                                </span>
                            </Dialog>

                            <Dialog header="Düzenle" footer={editDialogFooter} visible={this.state.visibleEditDialog}
                                    className=""
                                    width="350px" modal={true} onHide={this.onHideEditDialog}>
                                <span className="ui-float-label">
                                    <label htmlFor="inName">Ad </label>
                                    <InputText id="inName" value={this.state.selectRow.name}
                                               style={{marginLeft: '.5em'}} onChange={(e) =>
                                        this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                name: e.target.value
                                            }
                                        })
                                    }/>
                                </span>

                            </Dialog>

                            <Dialog header="Emin misiniz?" footer={deleteDialogFooter}
                                    visible={this.state.visibleDeleteDialog} width="350px"
                                    modal={true} onHide={(e) => this.setState({visibleDeleteDialog: false})}>
                                <b>{this.state.selectRow.name}</b> parametresini silmek istediğinize emin misiniz?
                            </Dialog>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({parameterTypes}) => {
    return {
        dataList: parameterTypes.dataList,
        fetching: parameterTypes.fetching,
        error: parameterTypes.error
    }
};

const mapDispatchToProps = {
    fetchParameterTypes,
    newParameterTypes,
    deleteParameterTypes,
    updateParameterTypes
};
export default connect(mapStateToProps, mapDispatchToProps)(ParameterTypePage);
