import React from "react";
import Linkify from 'react-linkify';
import StarRatingComponent from "react-star-rating-component";
import { Button } from "antd";
import IntlMessages from "util/IntlMessages";

const ProjectItem = ({
  project,
  grid,
  owner,
  readProject,
  associate,
  dissociate,
  projects_associated,
}) => {
  const { title, resume, averageOpinion } = project;

  let thumb = require("assets/images/Logo_SPLIIK-single-bw.png");
  if (project.media1 && project.media1.id) {
    thumb = project.media1.path;
  } else if (project.media) thumb = project.media;
  return (
    <div
      className={`gx-product-item  ${
        grid ? "gx-product-vertical" : "gx-product-horizontal"
        }`}
    >
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-link gx-grid-thumb-cover">
            <img alt={project.title} src={thumb} onClick={readProject} />
          </span>
        </div>
      </div>

      <div className="gx-product-body">
        <h3 className="gx-product-title">{title}</h3>
        <div className="ant-row-flex"></div>
        <div className="ant-row-flex gx-mb-1">
          {averageOpinion && (
            <StarRatingComponent
              name=""
              value={averageOpinion}
              editing={false}
            />
          )}
        </div>
        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="blank" href={decoratedHref} key={key}>
            {decoratedText}
          </a>
        )}>
          <p style={{ fontWeight: "100", color: "#545454" }}>
            {resume.length > 150
              ? resume.slice(0, resume.indexOf(" ", 150)) + "..."
              : resume}
          </p>
        </Linkify>
      </div>

      <div className="gx-product-footer">
        {owner ? (
          // when create/edit workshop
          projects_associated.includes(project.id) ? (
            <Button onClick={dissociate}>
              <IntlMessages id="miuwi.project.diffusion.disjoinButton" />
            </Button>
          ) : (
              <Button onClick={associate} type="primary">
                <IntlMessages id="miuwi.project.diffusion.joinButton" />
              </Button>
            )
        ) : (
            //read project
            <Button type="primary" onClick={readProject}>
              <IntlMessages id="eCommerce.readMore" />
            </Button>
          )}
      </div>
    </div>
  );
};
export default ProjectItem;
