'use strict';

angular.module('waitingRoomApp')
    .factory('ModalService', function ModalService($rootScope, $timeout, $location, Restangular) {
        var _this = this;
        _this.is_loading = false,
        _this.is_submitted = false,
        _this.modal_instance = {};

        //=============CREATE=============

        function createScheme (title) {
            console.log("SCHEME func", title);
            var scheme = {};
            scheme.Title = title;

            Restangular.all("schemes").post(scheme).then(function (scheme) {
                _this.is_loading = false;
                _this.is_submitted = false;
                _this.modal_instance.close();
                $rootScope.$broadcast("event:update_content_tree");
                $location.path('builder/scheme/' + scheme._id);
            }, function () {
                console.log("Error occured when creating new scheme");
            });
        }

        function createStep (title, parent_id) {
            var step = {};
            step.Title = title;
            step.Scheme_id = parent_id;

            Restangular.all("steps").post(step).then(function (step) {
                console.log(step);
                _this.is_loading = false;
                _this.is_submitted = false;
                _this.modal_instance.close();
                $rootScope.$broadcast("event:update_content_tree");
                $location.path('builder/step/' + step._id);
            }, function () {
                console.log("Error occured when creating new scheme");
            });
        }

        function createQuestion (title, parent_id) {
            var question = {};
            question.QuestionText = title;
            question.Step = parent_id;

            Restangular.all("questions").post(question).then(function (question) {
                console.log(question);
                _this.is_loading = false;
                _this.is_submitted = false;
                _this.modal_instance.close();
                $rootScope.$broadcast("event:update_content_tree");
                $location.path('builder/question/' + question._id);
            }, function () {
                console.log("Error occured when creating new scheme");
            });
        }

        //=============DELETE=============

        function deleteScheme (item_id) {
            console.log("deleteScheme func",item_id );
            Restangular.one("Schemes", item_id).remove().then(function () {
                _this.is_loading = false;
                _this.is_submitted = false;
                _this.modal_instance.close();
                $rootScope.$broadcast("event:update_content_tree");
            });
        }

        function deleteStep (item_id) {
            console.log("deleteStep func",item_id );
            Restangular.one("Steps", item_id).remove().then(function () {
                _this.is_loading = false;
                _this.is_submitted = false;
                _this.modal_instance.close();
                $rootScope.$broadcast("event:update_content_tree");
            });
        }

        function deleteQuestion (item_id) {
            console.log("deleteQuestion func - NOT IMPLEMENTED",item_id );
            Restangular.one("Questions", item_id).remove().then(function () {
                _this.is_loading = false;
                _this.is_submitted = false;
                _this.modal_instance.close();
                $rootScope.$broadcast("event:update_content_tree");
            });
        }


        return {
            init: function (scope) {
                _this.modal_instance = scope;
                return this;
            },
            isLoading: function () {
                return _this.is_loading;
            },
            isSubmitted: function () {
                return _this.is_submitted;
            },
            save: function (form, type, parent_id, title) {
                if(_this.modal_instance) {
                    _this.is_submitted = true;
                    console.log("The modal service -- save function was called", form, type, parent);

                    if(form.$valid) {
                        _this.is_loading = true;

                        switch(type) {
                            case "Scheme":
                                createScheme(title);
                                break;
                            case "Step":
                                createStep(title, parent_id);
                                break;
                            case "Question":
                                createQuestion(title, parent_id);
                                break;
                            default:
                                throw "The content type " + type + "is not recoqnized.";
                        }
                    }
                }else {
                    throw "Service has not been iniziated with a modal scope";
                }
            },
            delete: function (type, item_id) {
                if(_this.modal_instance) {
                    _this.is_submitted = true;
                    _this.is_loading = true;

                    switch(type) {
                        case "Scheme":
                            deleteScheme(item_id);
                            break;
                        case "Step":
                            deleteStep(item_id);
                            break;
                        case "Question":
                            deleteQuestion(item_id);
                            break;
                        default:
                            throw "The content type " + type + "is not recoqnized.";
                    }
                }else {
                    throw "Service has not been iniziated with a modal scope";
                }
            },
            close: function () {
                _this.modal_instance.close();
            }
        };
    });