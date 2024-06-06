import "./../index.css";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Form,
  Input,
  Layout,
  Select,
  Button,
  Switch,
  Row,
  Col,
  Modal,
  Tag,
  Icon,
  Tooltip
} from "antd";

import { editProject, getProject } from "../../../appRedux/actions/projects";
import {
  getCategoriesCache,
  getCategoriesItems
} from "../../../appRedux/actions/category";
import { getSubCategories } from "../../../appRedux/actions/subCategory";
import { setNextValue } from "../../../appRedux/actions/screen";
import {
  getProjectThreads,
  RESUME_AUTHOR,
  TITLE_AUTHOR
} from "../../../appRedux/actions/threadsAction";
import IntlMessages from "../../../util/IntlMessages";
import ConversationThreading from "./components/ConversationThreading";

const { Option } = Select;
const { TextArea } = Input;
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid_token: false,
      charactersTitle: "",
      charactersResume: "",
      title: "",
      resume: "",
      category: null,
      archive: "",
      online: "",
      thread: {
        visible: false,
        title: "",
        type: TITLE_AUTHOR,
        label: ""
      },
      subCategory: null,
      hideSubCategory: false,

      //tags
      tags: [],
      inputVisible: false,
      inputValue: "",
      loading: false
    };
    this.onChange = this.change.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSubCat = this.handleChangeSubCat.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      window.scrollTo(0, 0);
      this.props.getCategoriesItems();
      /* this.props.getCategoriesCache(); */
      let slug = this.props.slug;
      if (slug) {
        this.props.getProject(slug).then(() => {
          if (this.props.project) {
            if (this.props.project.category) {
              this.getSubCategory(this.props.project.category.id);
              // Subcategories
              if (this.props.project.subcategory) {
                let subCat = this.props.project.subcategory;
                this.props.form.setFieldsValue({ subCategory: subCat.id });
              }
            }
          }
        });
      } else this.props.setNextValue(false);
      this.setState({
        loading: false
      });
    }
  }

  showThreads = (type, title, label) => {
    this.props.getProjectThreads(this.props.slug, type);
    this.setState({
      thread: { visible: true, title: title, type: type, label: label }
    });
  };

  hideThreads = e => {
    this.setState({
      thread: { visible: false, type: "", title: "" }
    });
  };

  handleChange(value) {
    this.setState({ category: `${value}`, subCategory: null });
    this.getSubCategory(value);
    this.props.form.setFieldsValue({ subCategory: null });
  }

  handleChangeSubCat(value) {
    this.setState({ subCategory: value });
  }

  change = (event, stateName, maxValue) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    switch (stateName) {
      case "charactersTitle":
        if (this.state.charactersTitle.length < maxValue) {
          this.setState({ [stateName]: event.target.value });
        }
        break;
      case "charactersResume":
        if (this.state.title != null && this.state.subCategory != null)
          this.props.setNextValue(true);
        if (this.state.charactersResume.length < maxValue) {
          this.setState({ [stateName]: event.target.value });
        }
        break;
      default:
        break;
    }
  };

  getSubCategory(id) {
    this.props.getSubCategories(id);
    this.setState({
      hideSubCategory: true
    });
  }

  //--- tags ---
  showTagInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleCloseTag = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  handleTagInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleTagInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: ""
    });
  };

  saveTagInputRef = input => (this.input = input);

  render() {
    const { categories } = this.props;
    let project = { ...this.props.project };
    const { getFieldDecorator } = this.props.form;
    let { threads } = this.props;
    let { subCategories } = this.props;
    let language = this.props.languageId;
    //tags
    const { tags, inputVisible, inputValue } = this.state;
    let tags_p = [];
    if (project.tags)
      project.tags.forEach(element => {
        tags_p.push(element.title);
      });
    if (tags.length)
      tags.map(t => {
        if (tags_p && tags_p.indexOf(t) === -1) tags_p.push(t);
        return t;
      });

    return (
      <div className="steps-content">
        {this.state.invalid_token && <Redirect to={"/login"} />}
        <Layout>
          <Form>
            {getFieldDecorator("slug", { initialValue: this.props.slug })(
              <Input type="hidden"></Input>
            )}
            {/* ONLINE/ARCHIVE */}
            {project && project.id && false && (
              <Row>
                <Col span={6}>
                  <label>Archive</label>{" "}
                  <Switch
                    onChange={this.onCheck}
                    defaultChecked={project.archive}
                  />
                </Col>
                <Col span={6}>
                  <label>Online</label>{" "}
                  <Switch
                    onChange={this.onCheck}
                    defaultChecked={project.online}
                  />
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>
            )}

            {/* TITRE */}
            <Form.Item>
              <p style={{ lineHeight: "normal" }}>
                <IntlMessages id="miuwi.project.create.firstParagraph" />
              </p>
              <h3 className="text-info color-5">
                {" "}
                <IntlMessages id="miuwi.titleLabel" />{" "}
              </h3>
              <p>
                <IntlMessages id="miuwi.project.create.title.description" />
              </p>

              {getFieldDecorator("title", {
                initialValue: project && project.title,
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.title" />
                  }
                ]
              })(
                <Input
                  name="title"
                  maxLength={150}
                  onChange={e => this.change(e, "charactersTitle", 150)}
                ></Input>
              )}

              <label>
                <IntlMessages id="miuwi.project.create.title.exemple" />
              </label>
              <span className="nb_characters">
                {this.state.charactersTitle.length} /150 caractères
              </span>
              <br />
              {project && project.id && (
                <Button
                  style={{
                    float: "right",
                    color: "#F04E14",
                    border: "none",
                    boxShadow: "none"
                  }}
                  onClick={() =>
                    this.showThreads(
                      TITLE_AUTHOR,
                      project.title,
                      <IntlMessages id="miuwi.titleLabel" />
                    )
                  }
                >
                  <IntlMessages id="miuwi.thread.link" />
                </Button>
              )}
            </Form.Item>

            {/* CATEGORIES */}
            <Form.Item>
              <h3 className="text-info">
                <IntlMessages id="miuwi.project.create.categories" />
              </h3>
              <p className="justify-content-left">
                <IntlMessages id="miuwi.project.create.categories.description" />
              </p>
              <Col span={16}>
                <Form.Item>
                  {getFieldDecorator("category", {
                    initialValue:
                      project && project.category ? project.category.id : null,
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="miuwi.errorInput.title" />
                      }
                    ]
                  })(
                    <Select
                      onChange={this.handleChange}
                      style={{ width: "200px" }}
                      placeholder={
                        <IntlMessages
                          id="miuwi.form.select"
                          dropdownMatchSelectWidth={false}
                        />
                      }
                    >
                      <Option key={0} value={null}>
                        <IntlMessages id="miuwi.project.category" />
                      </Option>
                      {categories &&
                        categories.map((cat, key) => {
                          let label = cat["label_" + language];
                          return (
                            <Option key={key} value={cat.id}>
                              {label}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </Form.Item>
                {/* SOUS - CATEGORIE */}
              </Col>
              {true && (
                <Col span={8}>
                  <Form.Item>
                    {getFieldDecorator("subCategory", {
                      initialValue:
                        project && project.subcategory
                          ? project.subcategory.id
                          : this.state.subCategory,

                      rules: [
                        {
                          required: true,
                          message: <IntlMessages id="miuwi.errorInput.title" />
                        }
                      ]
                    })(
                      <Select
                        onChange={this.handleChangeSubCat}
                        style={{ width: "300px" }}
                        placeholder={
                          <IntlMessages
                            id="miuwi.form.select"
                            dropdownMatchSelectWidth={false}
                          //style={{ width: "350px" }}
                          />
                        }
                      >
                        <Option key={0} value={null}>
                          <IntlMessages id="miuwi.project.subcategory" />
                        </Option>
                        {subCategories &&
                          subCategories.map((subCat, key) => {
                            let label = subCat["label_" + language];
                            return (
                              <Option key={key} value={subCat.id}>
                                {label}
                              </Option>
                            );
                          })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              )}
            </Form.Item>

            {/* TAGS */}
            <Form.Item>
              <h3 className="text-info">
                <IntlMessages id="miuwi.project.create.tags" />
              </h3>
              <div>
                {tags_p &&
                  tags_p.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={true}
                        onClose={() => this.handleCloseTag(tag)}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={index}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                        tagElem
                      );
                  })}
                {inputVisible && (
                  <>
                    <Input
                      ref={this.saveTagInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleTagInputChange}
                      onBlur={this.handleTagInputConfirm}
                      onPressEnter={this.handleTagInputConfirm}
                    />
                  </>
                )}
                {!inputVisible && (
                  <Tag
                    onClick={this.showTagInput}
                    style={{ background: "#fff", borderStyle: "dashed" }}
                  >
                    <Icon type="plus" />
                    New Tag
                  </Tag>
                )}
              </div>
              <p style={{ fontWeight: 100, lineHeight: "1em" }}>
                <IntlMessages id="miuwi.project.create.tags.help" />
              </p>
            </Form.Item>

            {/* RÉSUMÉ */}
            <Form.Item>
              <h3 className="text-info">
                <IntlMessages id="miuwi.project.create.resume" />
              </h3>
              <p
                className="justify-content-left"
                style={{ lineHeight: "normal" }}
              >
                <IntlMessages id="miuwi.project.create.resume.description" />
              </p>
              {getFieldDecorator("resume", {
                initialValue: project && project.resume,
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.title" />
                  }
                ]
              })(
                <TextArea
                  maxLength={1000}
                  rows={10}
                  name="resume"
                  onChange={e => this.change(e, "charactersResume", 1000)}
                ></TextArea>
              )}
              <span className="nb_characters">
                {" "}
                {this.state.charactersResume.length}/1000 caractères
              </span>
              <br />
              <br />
              {project && project.id && (
                <Button
                  style={{
                    float: "right",
                    color: "#F04E14",
                    border: "none",
                    boxShadow: "none"
                  }}
                  onClick={() =>
                    this.showThreads(
                      RESUME_AUTHOR,
                      project.resume,
                      <IntlMessages id="miuwi.project.create.resume" />
                    )
                  }
                >
                  <IntlMessages id="miuwi.thread.link" />
                </Button>
              )}
            </Form.Item>

            {/* THREADS  */}
            <Modal
              title={
                <p>
                  <IntlMessages id="miuwi.thread.label" />{" "}
                  {this.state.thread.label}{" "}
                </p>
              }
              visible={this.state.thread.visible}
              onCancel={() => this.hideThreads()}
              footer={[null, null]}
              width="60%"
            >
              <p style={{ whiteSpace: "pre-line" }}>
                {this.state.thread.title}
              </p>
              {project && project.id && (
                <ConversationThreading
                  type={this.state.thread.type}
                  threads={threads}
                  project={project}
                />
              )}
            </Modal>
          </Form>
        </Layout>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: "project-step1" })(Step1);

const mapStateToProps = state => {
  return {
    categories: state.categories.items,
    project: state.projects.project,
    threads: state.threads.threads,
    subCategories: state.subCategories.subCategories,
    languageId: state.settings.locale.languageId
  };
};

export default connect(mapStateToProps, {
  editProject,
  getProject,
  getProjectThreads,
  setNextValue,
  getCategoriesCache,
  getSubCategories,
  getCategoriesItems
})(WrappedForm);
